import {
  buscarTodosProfessoresModel,
  buscarProfessorPorIdModel,
  criarProfessorModel,
  atualizarProfessorModel,
  deletarProfessorModel,
} from "../models/professorModel.js";

export const listarProfessores = async (req, res) => {
  try {
    const professores = await buscarTodosProfessoresModel();
    return res.status(200).json(professores);
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao listar professores",
      erro: error.message,
    });
  }
};


export const buscarProfessorPorId = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🔍 Buscando professor com ID: ${id}`); 

    const professor = await buscarProfessorPorIdModel(id);
    console.log(`📥 Resultado da busca:`, professor); 

    if (!professor) {
      return res.status(404).json({
        mensagem: "Professor não encontrado",
      });
    }

    return res.status(200).json(professor);
  } catch (error) {
    console.error('Erro ao buscar professor:', error);
    return res.status(500).json({
      mensagem: "Erro ao buscar professor",
      erro: error.message,
    });
  }
};

export const criarProfessor = async (req, res) => {
  try {
    const { nome, email, telefone, especialidade } = req.body;
    
    console.log('Dados recebidos:', { nome, email, telefone, especialidade }); // Debug

    if (!nome || !email || !telefone || !especialidade) {
      console.log('Campos faltando:', { 
        nome: !!nome, 
        email: !!email, 
        telefone: !!telefone, 
        especialidade: !!especialidade 
      });
      return res.status(400).json({
        mensagem: "Campos obrigatórios faltando",
        required: ["nome", "email", "telefone", "especialidade"],
        received: { nome, email, telefone, especialidade }
      });
    }

    const result = await criarProfessorModel({
      nome,
      email,
      telefone,
      especialidade,
    });
    
    console.log('Resultado do cadastro:', result); // Debug

    return res.status(201).json({
      mensagem: "Professor criado com sucesso",
      id: result.insertId,
    });
  } catch (error) {
    console.error('Erro no cadastro:', error); // Debug
    return res.status(500).json({
      mensagem: "Erro ao criar professor",
      erro: error.message,
    });
  }
};
export const atualizarProfessor = async (req, res) => {
  try {
    const { id } = req.params;

    const professorExiste = await buscarProfessorPorIdModel(id);

    if (!professorExiste) {
      return res.status(404).json({
        mensagem: "Professor não encontrado",
      });
    }

    await atualizarProfessorModel(id, req.body);

    return res.status(200).json({
      mensagem: "Professor atualizado com sucesso",
    });
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao atualizar professor",
      erro: error.message,
    });
  }
};

export const removerProfessor = async (req, res) => {
  try {
    const { id } = req.params;

    const professorExiste = await buscarProfessorPorIdModel(id);

    if (!professorExiste) {
      return res.status(404).json({
        mensagem: "Professor não encontrado",
      });
    }

    await deletarProfessorModel(id);

    return res.status(200).json({
      mensagem: "Professor removido com sucesso",
    });
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao remover professor",
      erro: error.message,
    });
  }
};