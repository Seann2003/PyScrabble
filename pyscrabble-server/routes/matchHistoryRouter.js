const express = require('express');
const { getMatchHistory, addMatchHistory } = require('../controllers/matchHistoryController');
const { authenticateJwtToken } = require('../middleware/authenticateJwtToken')
const router = express.Router();

router.get('/', authenticateJwtToken, getMatchHistory);
router.post('/', authenticateJwtToken, addMatchHistory);

module.exports = router;
