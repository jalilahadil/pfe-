const express = require('express');
const router = express.Router();
const { createQuizResponse,getQuizResponsesByStudentId, getQuizResponsesByQuizId ,getQuizResponsesByQuizIdAndStudentId,deleteQuizResponseById} = require('../controller/quizResponseController');

// Route to create or update a quiz response
router.post('/quizReponse/addResponse', createQuizResponse);

// Route to get quiz responses by quizId
router.get('/quizReponse/getResponseByQuiz/:quizId', getQuizResponsesByQuizId);

// Route to get quiz responses by quizId
router.get('/quizReponse/getResponseByStudent/:studentId', getQuizResponsesByStudentId);

// Route to get quiz responses by quizId and studentId

router.get('/quizReponse/:quizId/:studentId', getQuizResponsesByQuizIdAndStudentId);

// Route to delete quiz response by responseId
router.delete('/response/deleteResponse/:responseId', deleteQuizResponseById);

module.exports = router;
