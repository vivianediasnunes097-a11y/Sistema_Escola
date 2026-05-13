import db from "../config/db.js";
import bcrypt from "bcrypt";

export const listarUsuarios = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, nome, email, perfil, criado_em FROM usuarios"
    );
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao listar usuários",
      erro: error.message,
    });
  }
};

export const criarUsuario = async (req, res) => {
  try {
    const { nome, email, senha, perfil, tipo } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({
        mensagem: "Campos obrigatórios: nome, email, senha",
      });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const perfilFinal = perfil || tipo || "admin"; // ✅ aceita perfil ou tipo

    const [result] = await db.query(
      "INSERT INTO usuarios (nome, email, senha, perfil) VALUES (?, ?, ?, ?)",
      [nome, email, senhaHash, perfilFinal]
    );

    return res.status(201).json({
      mensagem: "Usuário criado com sucesso",
      id: result.insertId,
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ mensagem: "Email já cadastrado" });
    }
    return res.status(500).json({
      mensagem: "Erro ao criar usuário",
      erro: error.message,
    });
  }
};

export const buscarUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT id, nome, email, perfil, criado_em FROM usuarios WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    return res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao buscar usuário",
      erro: error.message,
    });
  }
};

export const atualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, perfil, tipo } = req.body;

    const [exists] = await db.query(
      "SELECT id FROM usuarios WHERE id = ?",
      [id]
    );

    if (exists.length === 0) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    const perfilFinal = perfil || tipo || "admin"; // ✅ aceita perfil ou tipo

    await db.query(
      "UPDATE usuarios SET nome = ?, email = ?, perfil = ? WHERE id = ?",
      [nome, email, perfilFinal, id]
    );

    return res.status(200).json({ mensagem: "Usuário atualizado com sucesso" });
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao atualizar usuário",
      erro: error.message,
    });
  }
};

export const removerUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const [exists] = await db.query(
      "SELECT id FROM usuarios WHERE id = ?",
      [id]
    );

    if (exists.length === 0) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    await db.query("DELETE FROM usuarios WHERE id = ?", [id]);

    return res.status(200).json({ mensagem: "Usuário removido com sucesso" });
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao remover usuário",
      erro: error.message,
    });
  }
};