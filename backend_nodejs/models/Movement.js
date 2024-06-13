const mongoose = require('mongoose');

const movementSchema = new mongoose.Schema({
    m_tid: {
        type: String,
        required: true
    },
    m_name: {
        type: String,
        required: true
    },
    m_description: {
        type: String,
        required: true
    },
    m_photo: {
        type: String,
        required: true
    },
    m_video: {
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

movementSchema.index({ coordinates: "2dspehere" });
const Movement = mongoose.model("Movement", movementSchema);
module.exports = Movement;