const { DataTypes } = require('sequelize');
const sequelize = require('../db/db.js');   
const bcrypt = require('bcryptjs');

const Admin = sequelize.define('Admin', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'email'
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'senha'
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'nome'
    },
    cargo: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'cargo'
    }
}, {
    hooks: {
        beforeCreate: async (admin) => {
            if (admin.senha) {
                const salt = await bcrypt.genSalt(10);
                admin.senha = await bcrypt.hash(admin.senha, salt);
            }
        },
        beforeUpdate: async (admin) => {
            if (admin.changed('senha')) {
                const salt = await bcrypt.genSalt(10);
                admin.senha = await bcrypt.hash(admin.senha, salt);
            }
        },
    },
    tableName: 'admins',
    timestamps: false
});

module.exports = Admin;
