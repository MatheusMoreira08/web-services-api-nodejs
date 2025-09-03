const Email = require('./ValueObjects/Email');
const Password = require('./ValueObjects/Password'); // assumimos que password ja faz o hasing
const Name = require('./ValueObjects/Name');
const { v4: uuidv4 } = require('uuid');

class User {
    constructor(name, email, password, id = uuidv4()) {
        if (!name || !email || !password) {
            throw new Error("User properties cannot be empty.");
        }

        this.id = id; // uuid
        this.name = new Name(name);
        this.email = new Email(email);
        // password value object lida com hashing ao ser criado
        this.password = new Password(password);
    }

    // metodos de comportamento de dominio
    async comparePassword(plainPassword) {
        return await this.password.compare(plainPassword);
    }

    updatePassword(newPassword) {
        this.password = new Password(newPassword);
    }

    tooObject() {
        return {
            id: this.id,
            name: this.name.value,
            email: this.email.value,
            password: this.password.hashedValue // EXPOR O HASH, NÃO A STRING PURA
        };
    }
}

module.exports = User;