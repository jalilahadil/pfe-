const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    lessonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
        required: true
    }
});

const Exercise = mongoose.model("Exercise", exerciseSchema);
module.exports = Exercise;