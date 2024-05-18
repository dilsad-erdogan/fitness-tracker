const mongoose = require('mongoose');

const userRoleSchema = new mongoose.Schema({
    r_name: {
        type: String,
        required: true
    },
    date_time: {
        type: Date,
        default: Date.now
    },
    is_active: {
        type: Boolean
    }
}, { timestamps: true });

userRoleSchema.index({ coordinates: "2dspehere" });
const UserRole = mongoose.model("UserRole", userRoleSchema);
module.exports = UserRole;