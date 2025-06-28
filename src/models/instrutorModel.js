const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');
const { cursoModel } = require('./cursoModel');

const instrutorModel = sequelize.define('intrutores', {
    ID_Instrutor:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nomeInstrutor:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cpfInstrutor:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    emailInstrutor:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    especialidadeInstrutor:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefoneIntrutor:{
        type: DataTypes.STRING,
        allowNull: true
    },
    dataContratacaoInstrutor:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
},{
    tableName: 'Cursos',
    timestamps: false

});

module.exports = {IntrutorModel};