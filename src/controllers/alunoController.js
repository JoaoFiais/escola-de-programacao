const { default: Message } = require('tedious/lib/message');
const { alunoModel } = require('../models/alunomodel');
const { Op } = require('sequelize');
const { parseDateBd } = require('../utils/dateUtils');

const alunoController = {
    listarAlunos: async (req, res) => {

        try {
            let {idAluno, nomeAluno} = req.query;

            let conditions = {};

            if (idAluno) {
                conditions.idAluno = idAluno;
            }

            if (nomeAluno) {
                conditions.nomeAluno = nomeAluno;
            }

            let alunos = await alunoModel.findAll({
                where:{
                   [Op.or]:[
                    {ID_Aluno: {[Op.eq]: conditions.ID_Aluno}},
                    {nomeAluno: {[Op.substring]: conditions.nomeAluno}}
                   ]

                }
            });

            // mapeia o array de alunos para ajustar a data de nascimento de cada aluno
            // Utiliza a função parseDateBd para corrigir possiveis problemas de fuso horario
            // Retorna um novo array com as datas corrigidas

            alunos = alunos.map(aluno => {
                aluno.dataNascimentoAluno = parseDateBd(aluno.dataNascimentoAluno);
                return aluno;
            });

            return res.status(200).json(alunos);

        } catch (error) {

            console.error("Error ao listar alunos:", error);
            return res.status(500).json({ messagem: "" });

        }

    },
    cadastrarAluno: async (req, res) => {
        try {

            const { nomeAluno, cpfAluno, dataNascimentoAluno, emailAluno, telefoneAluno, enderecoAluno } = req.body;

            //validaçao para garantir que todos os campos obrigatórios sejam fornecidos.
            if (!nomeAluno || !cpfAluno || !dataNascimentoAluno || !emailAluno) {
                return res.status(400).json({ Message: "Campos obrigatórios não preenchidos" });

            }

            let aluno = await alunoModel.findOne({
                where: {
                    [Op.or]: [
                        { cpfAluno },
                        { emailAluno }
                    ]
                }
            });

            if (aluno) {
                return res.status(409).json({ message: "Aluno já cadastrado!" })
            }

            await alunoModel.create({ nomeAluno, cpfAluno, dataNascimentoAluno, emailAluno, telefoneAluno, enderecoAluno });

            return res.status(201).json({ message: "Aluno cadastrado com sucesso!" })

        } catch (error) {

            console.error("Erro ao cadastrar aluno:", error);
            return res.status(500).json({ message: "Erro ao cadastrar aluno!" });

        }
    },
    atualizarAluno: async (req, res) => {

        try {

            const { ID_Aluno } = req.params;
            const { nomeAluno, cpfAluno, dataNascimentoAluno, emailAluno, telefoneAluno, enderecoAluno } = req.body;

            let aluno = await alunoModel.findByPk(ID_Aluno);

            if (!aluno) {
                return res.status(404).json({ message: "aluno não encotrado!" });
            }

            if (cpfAluno || emailAluno) {
                aluno = await alunoModel.findOne({
                    where: {
                        [Op.or]: [
                            { cpfAluno },
                            { emailAluno }
                        ]
                    }
                });

                if (!aluno) {
                    return res.status(409).json({ message: "Email ou CPF já cadastrados!" });
                }
            }

            let dadosAtualizados = { nomeAluno, cpfAluno, dataNascimentoAluno, emailAluno, telefoneAluno, enderecoAluno };

            await alunoModel.update(dadosAtualizados, { where: { ID_Aluno } });

            aluno = await alunoModel.findByPk(ID_Aluno);

            console.log(aluno.dataNascimentoAluno);

            aluno.dataNascimentoAluno = parseDateBd(aluno.dataNascimentoAluno);

            console.log(aluno.dataNascimentoAluno);

            return res.status(200).json({ message: "Aluno atualizado com sucesso:", Aluno: aluno });

        } catch (error) {

            console.error("Error ao atualizar aluno:", error);
            return res.status(500).json({ message: "Erro ao atualizar aluno" });

        }

    },
    deletarAluno: async (req, res) => {

        try {

            const { ID_Aluno } = req.params; // indentifcar qual id sera deletado

            let aluno = await alunoModel.findByPk(ID_Aluno);

            if (!aluno) {
                return res.status(404).json({ message: "aluno não encontrado!" });
            }

            let nomeAluno = aluno.nomeAluno;

            let result = await alunoModel.destroy({ where: { ID_Aluno } });

            if (result > 0) {

                return res.status(200).json({ message: `${nomeAluno} foi excluido com sucesso!` });

            } else {
                return res.status(404).json({ message: "Erro ao Excluir aluno!" })
            }

        } catch (error) {
            console.error("Erro ao excluir aluno!", error);
            return res.status(500).json({ message: "Erro ao excluir aluno" });
        }
    }
};

module.exports = { alunoController };