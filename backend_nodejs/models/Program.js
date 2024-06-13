const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
    p_name: {
        type: String,
        required: true
    },
    p_description: {
        type: String,
        required: true
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

programSchema.index({ coordinates: "2dspehere" });
const Program = mongoose.model("Program", programSchema);
module.exports = Program;