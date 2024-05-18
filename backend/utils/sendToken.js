const jwt = require('jsonwebtoken');

const getJwtToken = (user) => {
    return jwt.sign({ id: user._id }, 'your_secret_key', {
        expiresIn: '30d',
    });
};

const sendToken = (user, statusCode, res, message) => {
    const token = getJwtToken(user);

    res.status(statusCode).json({
        success: true,
        token,
        user: user,
        message: message
    });
};

module.exports = sendToken;