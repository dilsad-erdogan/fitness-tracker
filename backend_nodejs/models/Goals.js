const mongoose = require('mongoose');

const goalsSchema = new mongoose.Schema({
    u_id: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date_time: {
        type: Date,
        default: Date.now()
    },
    is_done: {
        type: Boolean,
        default: false
    },
    is_active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

goalsSchema.index({ coordinates: "2dspehere" });
const Goals = mongoose.model("Goals", goalsSchema);
module.exports = Goals;