const express = require('express');
const { getWinners } = require('../controllers/playersController');
const router = express.Router();

router.get('/:lobbyId', getWinners);

module.exports = router;
