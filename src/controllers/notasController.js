import {
  listarNotasModel,
  buscarNotaPorIdModel,
  criarNotaModel,
  atualizarNotaModel,
  removerNotaModel,
} from "../models/notasModel.js";

export const listar = async (req, res) => {
  try {
    const notas = await listarNotasModel();
    res.status(200).json(notas);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao listar notas",
      erro: error.message,
    });
  }
};

export const buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const nota = await buscarNotaPorIdModel(id);

    if (!nota) {
      return res.status(404).json({
        mensagem: "Nota não encontrada",
      });
    }

    res.status(200).json(nota);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao buscar nota",
      erro: error.message,
    });
  }
};

export const criar = async (req, res) => {
  try {
    const {
      aluno_id,
      disciplina_id,
      nota,
      bimestre,
      observacao,
    } = req.body;

    const id = await criarNotaModel({
      aluno_id,
      disciplina_id,
      nota,
      bimestre,
      observacao,
    });

    res.status(201).json({
      mensagem: "Nota cadastrada com sucesso",
      id,
    });
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao cadastrar nota",
      erro: error.message,
    });
  }
};

export const atualizar = async (req, res) => {
  try {
    const { id } = req.params;

    const linhasAfetadas = await atualizarNotaModel(
      id,
      req.body
    );

    if (linhasAfetadas === 0) {
      return res.status(404).json({
        mensagem: "Nota não encontrada",
      });
    }

    res.status(200).json({
      mensagem: "Nota atualizada com sucesso",
    });
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao atualizar nota",
      erro: error.message,
    });
  }
};

export const remover = async (req, res) => {
  try {
    const { id } = req.params;

    const linhasAfetadas = await removerNotaModel(id);

    if (linhasAfetadas === 0) {
      return res.status(404).json({
        mensagem: "Nota não encontrada",
      });
    }

    res.status(200).json({
      mensagem: "Nota removida com sucesso",
    });
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao remover nota",
      erro: error.message,
    });
  }
};