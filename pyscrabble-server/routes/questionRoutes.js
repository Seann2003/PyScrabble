const express = require('express');
const { getEasyQuestion, getMediumQuestion, getHardQuestion, getInsaneQuestion } = require('../controllers/questionController');
const { authenticateJwtToken } = require('../middleware/authenticateJwtToken');
const router = express.Router();

router.get('/easy', authenticateJwtToken, getEasyQuestion);
router.get('/medium', authenticateJwtToken, getMediumQuestion);
router.get('/hard', authenticateJwtToken, getHardQuestion);
router.get('/insane', authenticateJwtToken, getInsaneQuestion);

module.exports = router;
