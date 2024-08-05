const jwt = require('jsonwebtoken');

const authenticateJwtToken = (req, res, next) => {
    const token = req.cookies.Token;

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

const checkAuthStatus = (req, res) => {

    
    if (!token) {
      return res.status(401).json({ isAuthenticated: false });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // If verification is successful, send back the authenticated status and user info
      res.json({ 
        isAuthenticated: true, 
        user: { 
          id: decoded.userId, 
          type: decoded.userType 
        } 
      });
    } catch (error) {
      // If verification fails, send back unauthenticated status
      res.status(401).json({ isAuthenticated: false });
    }
  };

module.exports ={authenticateJwtToken, checkAuthStatus};
