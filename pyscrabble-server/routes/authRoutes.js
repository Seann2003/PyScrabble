const express = require('express');
const { login, signup, logout } = require('../controllers/authController');
const { checkAuthStatus } = require('../middleware/authenticateJwtToken');

const router = express.Router();

router.post('/login', login);
router.get('/status', checkAuthStatus);
router.post('/signup', signup);
router.post('/logout', logout);

module.exports = router;
