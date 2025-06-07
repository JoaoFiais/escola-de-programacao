const Sequelize = require('sequelize');

const  MSSQL_HOST = 'localhost'; // Servidor local.
const MSSQL_USER = 'sa'; //Usuario do servidor de banco de dados.
const MSSQL_PASSWORD = '123456789'; // Senha de acesso ao servidor de banco de dados.
const MSQL_DB = 'EscolaDeProgramação'; // Nome do banco de dados.
const MSQL_PORT = '1433'; // Porta de acesso ao servidor do SQL server.
const MSQL_DIALECT = 'mssql'; //  definiçao do dialeto de banco de dados (sistema de gerenciamento de banco de dados) como microsoft  sql server.

const sequelize = new Sequelize(MSQL_DB, MSSQL_USER, MSSQL_PASSWORD, {
    dialect: MSQL_DIALECT,
    host: MSSQL_HOST,
    port: MSQL_PORT
});

// async function testConnection() {
//     try {
//        await sequelize.authenticate()
//        console.log('conexão estabelecida com sucesso!') 
//     } catch (error) {
//         console.error('nao foi possivel conectar ao banco de dados!', error)
//     }
// }

// testConnection();

module.exports = { sequelize };