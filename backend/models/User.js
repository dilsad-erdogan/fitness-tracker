const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    u_role: {
        type: String,
        required: true
    },
    u_name: {
        type: String,
        required: true,
    },
    u_email: {
        type: String,
        required: true,
        unique: true,
    },
    u_password: {
        type: String,
        required: true,
    },
    twoFACode: {
        type: String
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpire: {
        type: Date
    },
    date_time: {
        type: Date,
        default: Date.now
    },
    is_active: {
        type: Boolean
    }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('u_password')) {
        return next();
    }
    this.u_password = await bcrypt.hash(this.u_password, 10);
    next();
});

userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // Token valid for 30 minutes

    return resetToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;