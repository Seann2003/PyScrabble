const express = require('express');
const router = express.Router();
const authenticateJwtToken = require('../middleware/authenticateJwtToken');

router.get('/userPage', authenticateJwtToken, (req, res) => {
    res.status(200).json({ message: 'Welcome to the protected route!', user: req.user });
});

module.exports = router;
