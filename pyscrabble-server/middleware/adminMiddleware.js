const adminOnly = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden: Admins only' });
    }
};

module.exports = { adminOnly };