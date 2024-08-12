const express = require('express');
const router = express.Router();
const { createQuestion, getAllQuestions, updateQuestion, deleteQuestion } = require('../controllers/sysQuestionController');
const { authenticateJwtToken } = require('../middleware/authenticateJwtToken'); 

router.post('/questions', authenticateJwtToken, createQuestion);
router.get('/questions', authenticateJwtToken, getAllQuestions);
router.put('/questions/:id', authenticateJwtToken, updateQuestion);
router.delete('/questions/:id', authenticateJwtToken, deleteQuestion);

module.exports = router;