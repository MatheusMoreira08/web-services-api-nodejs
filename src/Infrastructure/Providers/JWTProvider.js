const jwt = require('jsonwebtoken');
const config = require('../../config'); // Caminho corrigido

class JWTProvider {
  generateToken(payload) {
    return jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiresin });
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, config.jwt.secret);
    } catch (error) {
      return null;
    }
  }
}

module.exports = JWTProvider;
