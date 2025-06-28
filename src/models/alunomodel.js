const {sequelize} = require('../config/db');
const { DataTypes } = require('sequelize');

const alunoModel = sequelize.define('Alunos', {
    ID_Aluno:{
        type: DataTypes.INTEGER, // Tipo do campo como inteiro
        autoIncrement: true, // o valor sera gerado automaticamente
        primaryKey: true // define este campo como a chave primaria 
    },
    nomeAluno: {
        type: DataTypes.INTEGER, // tipo 
        allowNull: false
    },
    cpfAluno:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // define que o campo é unico
    },
    dataNascimentoAluno: { 
        type: DataTypes.DATEONLY , // tipo de dados apenas com a data (sem hora)
        allowNull: false 
    },
    emailAluno:{
        type: DataTypes.STRING,
        allowNull: false ,
        unique: true
    },
    telefoneAluno : {
        type: DataTypes.STRING,
        allowNull: true 
    },
    endereçoAluno: {
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    tableName: 'Alunos',
    timestamps: false
});

module.exports = {alunoModel};