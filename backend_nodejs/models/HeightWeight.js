const mongoose = require('mongoose');

const heightWeightSchema = new mongoose.Schema({
    hw_uid: {
        type: String,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
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

heightWeightSchema.index({ coordinates: "2dspehere" });
const HeightWeight = mongoose.model("HeightWeight", heightWeightSchema);
module.exports = HeightWeight;