const User = require('../../../Domain/User/User');
const UserOutput = require('../../DTOs/UserOutput');
const UserAlreadyExistsException = require('../../../Domain/Exceptions/UserAlreadyExistsException');

class RegisterUser {
  constructor(userRepository) {
    this.userRepository = userRepository; // IUserRepository
  }

  async execute(input) { // input é RegisterUserInput
    const existingUser = await this.userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new UserAlreadyExistsException('User with this email already exists');
    }

    const user = new User(input.name, input.email, input.password);

    await this.userRepository.save(user);

    return new UserOutput(null, user); // Retorna o usuário sem token no registro
  }
}

module.exports = RegisterUser;
