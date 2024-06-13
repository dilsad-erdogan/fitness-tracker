const mongoose = require('mongoose');

const userProgramSchema = new mongoose.Schema({
    up_uid: {
        type: String,
        required: true,
    },
    up_name: {
        type: String,
        required: true,
    },
    up_description: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true
    },
    time: {
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

userProgramSchema.index({ coordinates: "2dspehere" });
const UserProgram = mongoose.model("UserProgram", userProgramSchema);
module.exports = UserProgram;