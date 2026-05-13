import conexao from "../config/db.js";

export const findAllDisciplinas = async () => {
  const conn = await conexao.getConnection();
  
  try {
    const [rows] = await conn.query(`
      SELECT 
        id, 
        nome, 
        carga_horaria
      FROM disciplinas
      ORDER BY nome
    `);
    return rows;
  } finally {
    conn.release();
  }
};

export const findDisciplinaById = async (id) => {
  const conn = await conexao.getConnection();
  
  try {
    const [rows] = await conn.query(`
      SELECT 
        id, 
        nome, 
        carga_horaria
      FROM disciplinas
      WHERE id = ?
    `, [id]);
    return rows[0];
  } finally {
    conn.release();
  }
};

export const createDisciplina = async (disciplina) => {
  const conn = await conexao.getConnection();
  
  try {
    const [result] = await conn.query(
      `INSERT INTO disciplinas (nome, carga_horaria)
       VALUES (?, ?)`,
      [disciplina.nome, disciplina.carga_horaria]
    );
    return result.insertId;
  } finally {
    conn.release();
  }
};

export const updateDisciplina = async (id, disciplina) => {
  const conn = await conexao.getConnection();
  
  try {
    await conn.query(
      `UPDATE disciplinas 
       SET nome = ?, carga_horaria = ?
       WHERE id = ?`,
      [disciplina.nome, disciplina.carga_horaria, id]
    );
  } finally {
    conn.release();
  }
};

export const deleteDisciplina = async (id) => {
  const conn = await conexao.getConnection();
  
  try {
    await conn.query("DELETE FROM disciplinas WHERE id = ?", [id]);
  } finally {
    conn.release();
  }
};