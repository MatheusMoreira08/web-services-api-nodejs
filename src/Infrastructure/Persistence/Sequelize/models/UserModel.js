const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const UserModel = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaulValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: { // armazena a senha hasheada
        type: DataTypes.STRING,
        allowNull: false,
    },

}, {
    tableName: 'users',
    timestamps: true, // created_at e updated_at
});

module.exports = UserModel;
