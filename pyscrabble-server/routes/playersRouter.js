const express = require('express');
const { getWinners, fetchPlayers, updatePlayerScore, addPlayer } = require('../controllers/playersController');
const { authenticateJwtToken } = require('../middleware/authenticateJwtToken')
const router = express.Router();

router.get('/:lobbyId', authenticateJwtToken, getWinners);
router.get('/game/:code', authenticateJwtToken, fetchPlayers);
router.put('/game/:playerId', authenticateJwtToken, updatePlayerScore);
router.post('/game/:code', authenticateJwtToken, addPlayer);

module.exports = router;
