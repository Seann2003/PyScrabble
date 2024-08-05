const express = require('express');
const { createLobby,checkRoom, joinLobby  } = require('../controllers/lobbyController');
const { authenticateJwtToken } = require('../middleware/authenticateJwtToken')
const router = express.Router();

router.post('/createLobby', authenticateJwtToken, createLobby);
// router.post('/checkRoom', authenticateJwtToken, checkRoom);
router.post('/join/:lobby_code', authenticateJwtToken, joinLobby);

module.exports = router;
