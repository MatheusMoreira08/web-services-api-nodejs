// Local: src/Infrastructure/Persistence/Sequelize/SequelizeUserRepository.js

const IUserRepository = require('../../../Domain/Repositories/IUserRepository');
const UserModel = require('./models/UserModel');
const User = require('../../../Domain/User/User');

// Esta classe implementa a interface e usa o UserModel para falar com o banco
class SequelizeUserRepository extends IUserRepository {
  async save(user) {
    const newUser = await UserModel.create({
      id: user.id,
      name: user.name.value,
      email: user.email.value,
      password: user.password.hashedPassword
    });
    return newUser;
  }

  async findByEmail(email) {
    const userData = await UserModel.findOne({ where: { email: email } });
    if (!userData) {
      return null;
    }
    // Recria a entidade de domínio a partir dos dados do banco
    const user = new User(userData.name, userData.email, null, userData.id);
    user.password.hashedPassword = userData.password;
    return user;
  }

  async findById(id) {
    // Implemente se precisar buscar por ID
    const userData = await UserModel.findOne({ where: { id: id } });
    return userData;
  }
}

module.exports = SequelizeUserRepository;