const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the quiz response data
const quizResponseSchema = new Schema(
  {
    totalPoints: {
      type: Number,
      required: true,
    },
    quizId: {
      type:String,
      required: true,
    },
    responseDate: {
      type: String, 
      required: true,
    },
    studentId: {
      type: String, 
      required: true,
    },
  },
  { timestamps: true } 
);

// Create a model from the schema
const QuizResponse = mongoose.model('QuizResponse', quizResponseSchema);

module.exports = QuizResponse;
