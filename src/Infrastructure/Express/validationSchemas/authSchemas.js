// Local: src/Infrastructure/Express/validationSchemas/authSchemas.js
const Joi = require('joi');

// Schema para validar o registro de um novo usuário
const registerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Schema para validar o login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};