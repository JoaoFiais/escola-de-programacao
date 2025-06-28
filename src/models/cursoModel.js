const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize')

const cursoModel = sequelize.define('Cursos', {
    ID_Cursos:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nomeCurso:{
        type: DataTypes.STRING,
        allowNull: false
    },
    descricaoCurso:{
        type: DataTypes.STRING,
        allowNull: true
    },
    cargaHorariaCurso:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precoCurso:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
},{
    tableName: 'Cursos',
    timestamps: false
});

module.exports = {cursoModel};