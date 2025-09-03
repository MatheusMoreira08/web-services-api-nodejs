// Local: src/Infrastructure/Persistence/Redis/RedisTokenBlacklistRepository.js

const ITokenBlacklistRepository = require('../../../Domain/Repositories/ITokenBlacklistRepository');
const { redisClient } = require('./RedisClient'); // Importa o cliente Redis

class RedisTokenBlacklistRepository extends ITokenBlacklistRepository {
  // Adiciona o token na blacklist com um tempo de expiração em segundos
  async add(token, expiresIn) {
    await redisClient.set(token, 'blacklisted', {
      EX: expiresIn,
    });
  }

  // Verifica se o token existe na blacklist
  async exists(token) {
    const result = await redisClient.get(token);
    return result !== null;
  }
}

module.exports = RedisTokenBlacklistRepository;