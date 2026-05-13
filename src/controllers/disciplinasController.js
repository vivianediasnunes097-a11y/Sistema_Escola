import * as disciplinaModel from "../models/disciplinasModel.js";

export const listarDisciplinas = async (req, res) => {
  try {
    const disciplinas = await disciplinaModel.findAllDisciplinas();
    res.json(disciplinas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: error.message });
  }
};

export const buscarDisciplinaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const disciplina = await disciplinaModel.findDisciplinaById(id);
    
    if (!disciplina) {
      return res.status(404).json({ erro: "Disciplina não encontrada" });
    }
    
    res.json(disciplina);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: error.message });
  }
};

export const criarDisciplina = async (req, res) => {
  try {
    const { nome, carga_horaria } = req.body;
    
    if (!nome || !carga_horaria) {
      return res.status(400).json({ 
        erro: "Os campos nome e carga_horaria são obrigatórios" 
      });
    }
    
    const id = await disciplinaModel.createDisciplina({
      nome,
      carga_horaria
    });
    
    res.status(201).json({ 
      mensagem: "Disciplina criada com sucesso",
      id: id 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: error.message });
  }
};

export const atualizarDisciplina = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, carga_horaria } = req.body;
    
    const disciplinaExiste = await disciplinaModel.findDisciplinaById(id);
    
    if (!disciplinaExiste) {
      return res.status(404).json({ erro: "Disciplina não encontrada" });
    }
    
    await disciplinaModel.updateDisciplina(id, {
      nome,
      carga_horaria
    });
    
    res.json({ mensagem: "Disciplina atualizada com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: error.message });
  }
};

export const deletarDisciplina = async (req, res) => {
  try {
    const { id } = req.params;
    
    const disciplinaExiste = await disciplinaModel.findDisciplinaById(id);
    
    if (!disciplinaExiste) {
      return res.status(404).json({ erro: "Disciplina não encontrada" });
    }
    
    await disciplinaModel.deleteDisciplina(id);
    
    res.json({ mensagem: "Disciplina deletada com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: error.message });
  }
};