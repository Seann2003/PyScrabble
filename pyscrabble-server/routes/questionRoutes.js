const express = require('express');
const { getEasyQuestion, getMediumQuestion, getHardQuestion, getInsaneQuestion } = require('../controllers/questionController');
const router = express.Router();

router.get('/easy', getEasyQuestion);
router.get('/medium', getMediumQuestion);
router.get('/hard', getHardQuestion);
router.get('/insane', getInsaneQuestion);

module.exports = router;
