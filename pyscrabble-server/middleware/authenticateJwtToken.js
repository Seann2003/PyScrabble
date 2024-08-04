const jwt = require('jsonwebtoken');

const authenticateJwtToken = (req, res, next) => {
    const token = req.cookies.Token;
    console.log("tokens here: ",token)
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

module.exports ={authenticateJwtToken};
