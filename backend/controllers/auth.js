const catchAsyncError = require('../middleware/catchAsyncError');
const User = require('../models/User');
const sendToken = require('../utils/sendToken');
const sendEmail = require('../utils/sendEmail');
const bcrypt = require('bcrypt');
const rateLimit = require('express-rate-limit');

const generate2FACode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6 haneli bir kod üretir
};

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many login attempts from this IP, please try again after 15 minutes',
});

const accountLockout = async (req, res, next) => {
    const { u_email } = req.body;
    const user = await User.findOne({ u_email });

    if(user && user.loginAttempts >= 5 && user.lockUntil > Date.now()) {
        return res.status(403).json({ success: false, error: 'Your account is locked. Please try again later.' });
    }

    next();
}

const register = catchAsyncError(async (req, res) => {
    const { u_role, u_name, u_email, u_password } = req.body;

    if (!u_role || !u_name || !u_email || !u_password) {
        return res.status(400).json({ success: false, error: 'All fields are required!' });
    }

    const existingUser = await User.findOne({ u_email });
    if (existingUser) {
        return res.status(400).json({ success: false, error: 'This email is already taken. Try again please!' });
    }

    const user = await User.create({ u_role, u_name, u_email, u_password, is_active: true });
    sendToken(user, 201, res, 'Account created successfully!');
});

const loginOrigin = catchAsyncError(async (req, res) => {
    const { u_email, u_password } = req.body;

    if (!u_email || !u_password) {
        return res.status(400).json({ success: false, error: 'Please enter the email and password fields.' });
    }

    try {
        const user = await User.findOne({ u_email });

        if (!user) {
            return res.status(400).json({ success: false, error: 'Invalid email or password.' });
        }

        const isPasswordMatched = await bcrypt.compare(u_password, user.u_password);
        if (!isPasswordMatched) {
            user.loginAttempts += 1;
            if (user.loginAttempts >= 5) {
                user.lockUntil = Date.now() + 15 * 60 * 1000; // 15 dakika kilitle
            }
            await user.save();
            return res.status(400).json({ success: false, error: 'Invalid email or password.' });
        }

        if(user.loginAttempts > 0) {
            user.loginAttempts = 0;
            user.lockUntil = undefined;
            await user.save();
        }

        sendToken(user, 201, res, { message: 'Login successful' });
    } catch (error) {
        console.error('Error during login:', error); // Hata ayıklamak için log ekleyin
        res.status(500).json({ success: false, error: 'Internal server error.' });
    }
});

const login2FA = catchAsyncError(async (req, res) => {
    const { u_email, u_password } = req.body;

    if (!u_email || !u_password) {
        return res.status(400).json({ success: false, error: 'Please enter the email and password fields.' });
    }

    try {
        const user = await User.findOne({ u_email });

        if (!user) {
            return res.status(400).json({ success: false, error: 'Invalid email or password.' });
        }

        const isPasswordMatched = await bcrypt.compare(u_password, user.u_password);
        if (!isPasswordMatched) {
            user.loginAttempts += 1;
            if (user.loginAttempts >= 5) {
                user.lockUntil = Date.now() + 15 * 60 * 1000; // 15 dakika kilitle
            }
            await user.save();
            return res.status(400).json({ success: false, error: 'Invalid email or password.' });
        }

        // 2FA kodu oluştur ve kullanıcıya gönder
        const twoFACode = generate2FACode();
        user.twoFACode = twoFACode;
        user.twoFAExpire = Date.now() + 10 * 60 * 1000; // 10 dakika geçerli
        await user.save();

        const message = `Your 2FA code is:\n\n${twoFACode}\n\nIf you have not requested this code, please ignore it.`;
        await sendEmail({
            to: user.u_email,
            subject: 'Your 2FA Code',
            text: message,
        });

        res.status(200).json({ success: true, message: '2FA code sent to your email.' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, error: 'Internal server error.' });
    }
});

const verify2FA = catchAsyncError(async (req, res) => {
    const { u_email, twoFACode } = req.body;

    if (!u_email || !twoFACode) {
        return res.status(400).json({ success: false, error: 'Please enter the email and 2FA code fields.' });
    }

    try {
        const user = await User.findOne({ u_email });

        console.log(user);
        if (!user || user.twoFACode !== twoFACode || user.twoFAExpire < Date.now()) {
            return res.status(400).json({ success: false, error: 'Invalid or expired 2FA code.' });
        }

        user.twoFACode = undefined;
        user.twoFAExpire = undefined;
        await user.save();

        if(user.loginAttempts > 0) {
            user.loginAttempts = 0;
            user.lockUntil = undefined;
            await user.save();
        }

        sendToken(user, 200, res, { message: 'Login successful' });
    } catch (error) {
        console.error('Error during 2FA verification:', error);
        res.status(500).json({ success: false, error: 'Internal server error.' });
    }
});

const forgotPassword = catchAsyncError(async (req, res) => {
    const { u_id } = req.body;

    const user = await User.findById(u_id);
    if (!user) {
        return res.status(404).json({ success: false, error: 'User not found with this email.' });
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;
    const message = `Your password reset token is:\n\n${resetUrl}\n\nIf you have not requested this email, please ignore it.`;

    try {
        await sendEmail({
            to: user.u_email,
            subject: 'Password Recovery',
            text: message,
        });

        res.status(200).json({ success: true, message: 'Email sent' });
    } catch (error) {
        console.error('Error sending email:', error);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        res.status(500).json({ success: false, error: 'Email could not be sent' });
    }
});

module.exports = {
    register,
    loginOrigin: [loginLimiter, accountLockout, loginOrigin],
    login2FA,
    verify2FA: [loginLimiter, accountLockout, verify2FA],
    forgotPassword
};