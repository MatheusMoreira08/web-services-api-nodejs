class UserAlreadyExistsException extends Error {
    constructor(message = "User already exists.") {
        super(message);
        this.name = "UserAlreadyExistsException";
        this.statusCode = 409; // opcional, bom para http responses
    }
}

module.exports = UserAlreadyExistsException;