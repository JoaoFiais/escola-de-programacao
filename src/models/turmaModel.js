const {sequelize} = require('../config/db');
const { DataTypes, HasMany } = require('sequelize');

// turma requer curso e instrutor, entao voce ira exporta os outros arquivos que voce criou para o novo que voce esta criando

const { cursoModel } = require('./cursoModel');
const { instrutorModel } = require('./instrutorModel');
const { FOREIGNKEYS } = require('sequelize/lib/query-types');


const TurmaModel = require ('Turmas', {
    ID_Turma:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    dataInicioTurma:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    dataFimTurma:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    horarioInicioAulaTurma:{
        type: DataTypes.TIME,
        allowNull: false
    },
    horarioFimAulaTurma:{
        type: DataTypes.TIME,
        allowNull: false
    },
     
    idcursoTurma:{
     type: DataTypes.INTEGER,
     references:{
        model: cursoModel,
        key: 'ID_Curso'
     },
     allowNull: false
    },
    idInstutorTurma:{
        type: DataTypes.INTEGER,
        references:{
           model: instrutorModel,
           key: 'ID_Instutor'
        },
        allowNull: false
    },
},{
        tableName: 'Turma',
        timestamps: false
    
});

cursoModel.HasMany(TurmaModel, {foreignKey: 'idCursoTurma', as: 'Curso'})
instrutorModel.HasMany(TurmaModel, {foreignKey: 'idIntrutorTurma', as: 'Instrutor'})
TurmaModel.belongTo(cursoModel, {foreignKey: 'idCursoTurma', as: 'Curso'})
TurmaModel.belongTo(instrutorModel, {foreignKey: 'idIntrutorTurma', as: 'Instrutor'});

module.exports = { TurmaModel };