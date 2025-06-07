const {alunoModel} = require('../models/alunomodel');

const alunoController = {
    listarAlunos: async (req, res) => {
        
        try {

            let alunos = await alunoModel.findAll();

            return res.status(200).json(alunos);
            
        } catch (error) {

            console.error ("Error ao listar alunos:", error);
            return res.status(500).json({messagem:""});
            
        }

    },
    cadastrarAluno: (req, res) => {
        res.send("USUARIO CADASTRO COM SUCESSO !");
    },
    atualizarAluno: (req, res) => {
        const { ID_Aluno } = req.params;

        res.send(`Usuario ${ID_Aluno} foi atualizando com sucesso`);
    },
    deletarAluno: (req, res) => {
        const { ID_Aluno } = req.params;

        res.send(`Usuario ${ID_Aluno} foi deletado com sucesso`);
    }
};

module.exports = { alunoController };