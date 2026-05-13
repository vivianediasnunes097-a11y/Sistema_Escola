import {
  listarAlunosModel,
  buscarAlunoPorIdModel,
  criarAlunoModel,
  atualizarAlunoModel,
  removerAlunoModel,
} from "../models/alunosModel.js";

export const listarAlunos = async (req, res) => {
  try {
    const alunos = await listarAlunosModel();
    return res.status(200).json(alunos);
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao listar alunos",
      erro: error.message,
    });
  }
};

export const buscarAlunoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const aluno = await buscarAlunoPorIdModel(id);

    if (!aluno) {
      return res.status(404).json({
        mensagem: "Aluno não encontrado",
      });
    }

    return res.status(200).json(aluno);
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao buscar aluno",
      erro: error.message,
    });
  }
};

export const criarAluno = async (req, res) => {
  try {
    const {
      nome,
      cpf,
      email,
      telefone,
      data_nascimento,
      turma_id,
      status,
    } = req.body;

    if (!nome || !cpf || !email || !turma_id) {
      return res.status(400).json({
        mensagem: "Campos obrigatórios faltando",
      });
    }

    const insertId = await criarAlunoModel({
      nome,
      cpf,
      email,
      telefone,
      data_nascimento,
      turma_id,
      status,
    });

    return res.status(201).json({
      mensagem: "Aluno cadastrado com sucesso",
      id: insertId,
    });

  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao cadastrar aluno",
      erro: error.message,
    });
  }
};

export const atualizarAluno = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nome,
      cpf,
      email,
      telefone,
      data_nascimento,
      turma_id,
      status,
    } = req.body;

    const alunoExiste = await buscarAlunoPorIdModel(id);

    if (!alunoExiste) {
      return res.status(404).json({
        mensagem: "Aluno não encontrado",
      });
    }

    await atualizarAlunoModel(id, {
      nome,
      cpf,
      email,
      telefone,
      data_nascimento,
      turma_id,
      status,
    });

    return res.status(200).json({
      mensagem: "Aluno atualizado com sucesso",
    });
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao atualizar aluno",
      erro: error.message,
    });
  }
};

export const removerAluno = async (req, res) => {
  try {
    const { id } = req.params;

    const alunoExiste = await buscarAlunoPorIdModel(id);

    if (!alunoExiste) {
      return res.status(404).json({
        mensagem: "Aluno não encontrado",
      });
    }

    await removerAlunoModel(id);

    return res.status(200).json({
      mensagem: "Aluno removido com sucesso",
    });
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao remover aluno",
      erro: error.message,
    });
  }
};