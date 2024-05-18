const mongoose = require('mongoose');

const movementTitleSchema = new mongoose.Schema({
    t_name: {
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

movementTitleSchema.index({ coordinates: "2dspehere" });
const MovementTitle = mongoose.model("MovementTitle", movementTitleSchema);
module.exports = MovementTitle;