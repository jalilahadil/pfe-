const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
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
});

const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;