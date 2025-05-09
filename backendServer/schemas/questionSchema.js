const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    options: [{
        type: String,
        required: true
    }],
    correctAnswer: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true
    },
    quizId: {
        type: String,
        required: true
    }
});

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;