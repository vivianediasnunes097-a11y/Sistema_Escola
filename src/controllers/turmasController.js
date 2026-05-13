import {
  listarTurmas as listarTurmasModel,
  criarTurma as criarTurmaModel,
  deletarTurma as deletarTurmaModel,
  atualizarTurma as atualizarTurmaModel,
  buscarTurmaPorIdModel  
} from "../models/turmasModel.js";


export const buscarTurmaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🔍 Buscando turma com ID: ${id}`);
    
    const turma = await buscarTurmaPorIdModel(id);
    
    if (!turma) {
      return res.status(404).json({ mensagem: "Turma não encontrada" });
    }
    
    return res.status(200).json(turma);
  } catch (error) {
    console.error('Erro ao buscar turma:', error);
    return res.status(500).json({ mensagem: "Erro interno" });
  }
};


export const listarTurmas = async (req, res) => {
  try {
    const data = await listarTurmasModel();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao listar turmas:', error);
    return res.status(500).json({ mensagem: "Erro interno" });
  }
};

export const criarTurma = async (req, res) => {
  try {
    const { nome, ano_letivo, professor_id } = req.body;

    if (!nome || !ano_letivo) {
      return res.status(400).json({ mensagem: "Os campos 'nome' e 'ano' são obrigatórios" });
    }

    const result = await criarTurmaModel({
      nome,
      ano_letivo,
      professor_id,
    });

    return res.status(201).json({
      mensagem: "Turma criada com sucesso",
      id: result.insertId
    });
  } catch (error) {
    console.error('Erro ao criar turma:', error);
    return res.status(500).json({ mensagem: "Erro interno" });
  }
};

export const atualizarTurma = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, ano_letivo, professor_id } = req.body;

    await atualizarTurmaModel(id, {
      nome,
      ano_letivo,
      professor_id,
    });

    return res.status(200).json({
      mensagem: "Turma atualizada com sucesso",
    });
  } catch (error) {
    console.error('Erro ao atualizar turma:', error);
    return res.status(500).json({ mensagem: "Erro interno" });
  }
};

export const deletarTurma = async (req, res) => {
  try {
    const { id } = req.params;
    await deletarTurmaModel(id);
    
    return res.status(200).json({
      mensagem: "Turma removida com sucesso",
    });
  } catch (error) {
    console.error('Erro ao deletar turma:', error);
    return res.status(500).json({ mensagem: "Erro interno" });
  }
};