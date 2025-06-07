const express = require("express");
const router = express.Router(); // instancia o router , um objeto do express usado para definir rotas de forma modeluar e organizada.


// se acontecer qualquer erro inesperado que aparenta nao ter nenhuma soluçao, nao tema renicie o visualstudio ou exclua o alunoController.js e refaça.
const {alunoController} = require('../controllers/alunoController');

//rotas de alunos 
router.get("/", alunoController.listarAlunos) // rota responsavel por listar os alunos do sistema.

router.post("/", alunoController.cadastrarAluno) // ROTA responsavel por cadastrar de um novo aluno;

router.put("/:ID_Aluno", alunoController.atualizarAluno); // rotas rensponsavel por atualizar os dados de um aluno.

router.delete("/:ID_Aluno", alunoController.deletarAluno); // rotas rensponsavel por deletar os dados de um aluno.

module.exports = { rotasAlunos: router };