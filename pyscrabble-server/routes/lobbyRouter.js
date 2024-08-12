const express = require('express');
const { createLobby,joinLobby  } = require('../controllers/lobbyController');
const { authenticateJwtToken } = require('../middleware/authenticateJwtToken')
const router = express.Router();

router.post('/createLobby', authenticateJwtToken, createLobby);
router.post('/join/:lobby_code', authenticateJwtToken, joinLobby);

module.exports = router;
