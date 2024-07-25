const mongoose = require('mongoose');

const weeklyCalorie = new mongoose.Schema({
    u_id: {
        type: String,
        required: true
    },
    monday: {
        type: Number,
        required: true,
        default: 0
    },
    tuesday: {
        type: Number,
        required: true,
        default: 0
    },
    wednesday: {
        type: Number,
        required: true,
        default: 0
    },
    thursday: {
        type: Number,
        required: true,
        default: 0
    },
    friday: {
        type: Number,
        required: true,
        default: 0
    },
    saturday: {
        type: Number,
        required: true,
        default: 0
    },
    sunday: {
        type: Number,
        required: true,
        default: 0
    },
    date_time: {
        type: Date,
        default: Date.now()
    },
    is_active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

weeklyCalorie.index({ coordinates: "2dspehere" });
const WeeklyCalorie = mongoose.model("WeeklyCalorie", weeklyCalorie);
module.exports = WeeklyCalorie;