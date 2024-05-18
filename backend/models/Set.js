const mongoose = require('mongoose');

const setSchema = new mongoose.Schema({
    s_pid: {
        type: String,
        required: true,
    },
    s_mid: {
        type: String,
        required: true,
    },
    date_time: {
        type: Date,
        default: Date.now
    },
    is_active: {
        type: Boolean
    }
}, { timestamps: true });

setSchema.index({ coordinates: "2dspehere" });
const Set = mongoose.model("Set", setSchema);
module.exports = Set;