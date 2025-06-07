const express = require("express");

// importaçao de rotas

const { rotasAlunos } = require('./src/routes/alunoRoutes');

//APP

const app = express(); // Cria uma instancia do express, armazenando todos os metodos e funcionalidades em 'app'.

const PORT = 8081; // Defini a porta em que o servidor, ira escutar as requisiçoes.

app.use(express.json()); // configura o body-parser para interpretar corpos de requisiçoes no formato JSON.

app.use("/alunos", rotasAlunos);

app.listen(PORT, () => {
    console.log(`servidor rodando na porta ${PORT}`)
}
)