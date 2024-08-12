const express = require('express');
const router = express.Router();
const { getUserbyName } = require('../controllers/userController');
const { authenticateJwtToken } = require('../middleware/authenticateJwtToken'); 

router.get('/:id', authenticateJwtToken, getUserbyName);

module.exports = router;