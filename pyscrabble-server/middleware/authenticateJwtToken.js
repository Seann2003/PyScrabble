const jwt = require('jsonwebtoken');

const authenticateJwtToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized. No token provided.' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token in request header.' });
        }
        req.user = user;
        next();
    });
}

module.exports = authenticateJwtToken;
