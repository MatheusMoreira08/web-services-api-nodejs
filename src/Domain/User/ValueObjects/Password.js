const bcrytp = require('bcryptjs'); // usado para hashear a senha

class Password {
    constructor(value, isHashed = false) {
        if (!value) {
            throw new Error("Password cannot be empty.");
        }
        if (isHashed && value.length < 6) { // exemplo de regraa de negocio em min 6 caracteres
            throw new Error("Password must be at least 6 characters long.");
        }
        this.hashedPassword = isHashed ? value : this.hashedPassword(value);
    }

    hash(plainPassword) {
        // sincrono para simplificar mas idealmente usar bcrypt.hash assincrono
        return bcrytp.hashSync(plainPassword, 10);
    }

    async compare(plainPassword) {
        return await bcrytp.compare(plainPassword, this.hashedPassword);
    }

    equals(otherPassword) {
        return otherPassword instanceof Password && this.hashedPassword === otherPassword.hashedPassword;
    }
}

module.exports = Password;