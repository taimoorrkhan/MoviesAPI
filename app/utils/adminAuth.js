const jwt = require('jsonwebtoken');

const authenticateAdmin = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }
    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET); 
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }
        req.user = decoded;
        next();
    } catch (err) {
        console.error('Token verification failed:', err); 
        return res.status(401).json({ message: 'Invalid token' });
    }
};


module.exports = authenticateAdmin;