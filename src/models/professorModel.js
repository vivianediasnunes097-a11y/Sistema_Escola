import conexao from "../config/db.js";

export const buscarProfessorPorIdModel = async (id) => {
  const conn = await conexao.getConnection();
  try {
    const [rows] = await conn.query('SELECT * FROM professores WHERE id = ?', [id]);
    return rows[0]; 
  } finally {
    conn.release();
  }
};

export const criarProfessorModel = async (dados) => {
  const conn = await conexao.getConnection();
  try {
    const [result] = await conn.query(
      'INSERT INTO professores (nome, email, telefone, especialidade) VALUES (?, ?, ?, ?)',
      [dados.nome, dados.email, dados.telefone, dados.especialidade]
    );
    return { insertId: result.insertId };
  } finally {
    conn.release();
  }
};


export const buscarTodosProfessoresModel = async () => {
  const conn = await conexao.getConnection();

  try {
    const [rows] = await conn.query(`SELECT * FROM professores`);
    return rows;
  } finally {
    conn.release();
  }
};

export const atualizarProfessorModel = async (id, professor) => {
  const conn = await conexao.getConnection();

  try {
    await conn.query(
      `UPDATE professores SET nome=?, email=?, telefone=?, especialidade=? WHERE id=?`,
      [
        professor.nome,
        professor.email,
        professor.telefone,
        professor.especialidade,
        id
      ]
    );
  } finally {
    conn.release();
  }
};

export const deletarProfessorModel = async (id) => {
  const conn = await conexao.getConnection();

  try {
    await conn.query(`DELETE FROM professores WHERE id=?`, [id]);
  } finally {
    conn.release();
  }
};