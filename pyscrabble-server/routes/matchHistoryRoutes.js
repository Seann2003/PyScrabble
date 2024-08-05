const express = require('express');
const { getMatchHistory, getMatchHistoryById, addMatchHistory } = require('../controllers/matchHistoryController');
const { authenticateJwtToken } = require('../middleware/authenticateJwtToken')
const router = express.Router();

router.get('/', authenticateJwtToken, getMatchHistory);
router.get('/:id', authenticateJwtToken, getMatchHistoryById);
router.post('/', authenticateJwtToken, addMatchHistory);

module.exports = router;
