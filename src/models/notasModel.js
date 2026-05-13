import conexao from "../config/db.js";

export const listarNotasModel = async () => {
  let conn;

  try {
    conn = await conexao.getConnection();

    const [notas] = await conn.query(`
      SELECT
        n.id,
        n.aluno_id,
        a.nome AS aluno,
        n.disciplina_id,
        d.nome AS disciplina,
        n.nota,
        n.bimestre,
        n.observacao
      FROM notas n
      INNER JOIN alunos a ON n.aluno_id = a.id
      INNER JOIN disciplinas d ON n.disciplina_id = d.id
      ORDER BY a.nome, d.nome, n.bimestre
    `);

    return notas;
  } finally {
    if (conn) conn.release();
  }
};

export const buscarNotaPorIdModel = async (id) => {
  let conn;

  try {
    conn = await conexao.getConnection();

    const [rows] = await conn.query(
      `
      SELECT
        n.id,
        n.aluno_id,
        a.nome AS aluno,
        n.disciplina_id,
        d.nome AS disciplina,
        n.nota,
        n.bimestre,
        n.observacao
      FROM notas n
      INNER JOIN alunos a ON n.aluno_id = a.id
      INNER JOIN disciplinas d ON n.disciplina_id = d.id
      WHERE n.id = ?
      `,
      [id]
    );

    return rows[0] || null;
  } finally {
    if (conn) conn.release();
  }
};

export const criarNotaModel = async ({
  aluno_id,
  disciplina_id,
  nota,
  bimestre,
  observacao,
}) => {
  let conn;

  try {
    conn = await conexao.getConnection();

    const [result] = await conn.query(
      `
      INSERT INTO notas
      (aluno_id, disciplina_id, nota, bimestre, observacao)
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        aluno_id,
        disciplina_id,
        nota,
        bimestre,
        observacao,
      ]
    );

    return result.insertId;
  } finally {
    if (conn) conn.release();
  }
};

export const atualizarNotaModel = async (
  id,
  {
    aluno_id,
    disciplina_id,
    nota,
    bimestre,
    observacao,
  }
) => {
  let conn;

  try {
    conn = await conexao.getConnection();

    const [result] = await conn.query(
      `
      UPDATE notas
      SET
        aluno_id = ?,
        disciplina_id = ?,
        nota = ?,
        bimestre = ?,
        observacao = ?
      WHERE id = ?
      `,
      [
        aluno_id,
        disciplina_id,
        nota,
        bimestre,
        observacao,
        id,
      ]
    );

    return result.affectedRows;
  } finally {
    if (conn) conn.release();
  }
};

export const removerNotaModel = async (id) => {
  let conn;

  try {
    conn = await conexao.getConnection();

    const [result] = await conn.query(
      "DELETE FROM notas WHERE id = ?",
      [id]
    );

    return result.affectedRows;
  } finally {
    if (conn) conn.release();
  }
};