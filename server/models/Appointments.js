const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');

const Appointment = sequelize.define('Appointment', {
    name: { type: DataTypes.STRING, allowNull: false, field: 'nome' },
    phone: { type: DataTypes.STRING, allowNull: false, field: 'celular' },
    category: { type: DataTypes.STRING, allowNull: false, field: 'categoria' },
    procedure: { type: DataTypes.STRING, allowNull: false, field: 'procedimento' },
    date: { type: DataTypes.DATEONLY, allowNull: false, field: 'data' },
    time: { type: DataTypes.TIME, allowNull: false, field: 'horario' },
    status: { type: DataTypes.STRING, allowNull: false, field: 'status' }
}, {
    tableName: 'appointments',
    timestamps: false
});

module.exports = Appointment;
