const express = require('express');
const router = express.Router();
const { createQuestion, getAllQuestions, updateQuestion, deleteQuestion } = require('../controllers/sysQuestionController');

router.post('/questions', createQuestion);
router.get('/questions', getAllQuestions);
router.put('/questions/:id', updateQuestion);
router.delete('/questions/:id', deleteQuestion);

module.exports = router;