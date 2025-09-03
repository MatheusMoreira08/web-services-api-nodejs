const jwt = require('jsonwebtoken');
const authConfig = require('src/config/auth');

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, authConfig.secret, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user; // adciona os dados do usuario decodificados ao req
        next();
    });
};

module.exports = authenticateToken;