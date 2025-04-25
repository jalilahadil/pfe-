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
        type: String,
        required: true
    }
    ,
    score: {
        type: Number,
        required: true
    }
});

const Exercise = mongoose.model("Exercise", exerciseSchema);
module.exports = Exercise;