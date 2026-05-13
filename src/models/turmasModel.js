import conexao from "../config/db.js";

export const listarTurmas = async () => {
  const conn = await conexao.getConnection();

  try {
    const [rows] = await conn.query(`
      SELECT 
        t.id,
        t.nome,
        t.ano_letivo,
        t.professor_id,
        COALESCE(p.nome, 'Sem professor') AS professor
      FROM turmas t
      LEFT JOIN professores p ON p.id = t.professor_id
    `);

    return rows;
  } finally {
    conn.release();
  }
};

export const criarTurma = async (turma) => {
  const conn = await conexao.getConnection();

  try {
    const [result] = await conn.query(
      `INSERT INTO turmas (nome, ano_letivo, professor_id)
       VALUES (?, ?, ?)`,
      [
        turma.nome,
        turma.ano_letivo,
        turma.professor_id ?? null,
      ]
    );
    
    return { insertId: result.insertId };  // ✅ Retorne o ID
  } finally {
    conn.release();
  }
};


export const deletarTurma = async (id) => {
  const conn = await conexao.getConnection();

  try {
    const [rows] = await conn.query(
      'SELECT id FROM turmas WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      throw new Error('Turma não encontrada');
    }

    await conn.query(
      'DELETE FROM turmas WHERE id = ?',
      [id]
    );

    return { sucesso: true, mensagem: 'Turma deletada com sucesso' };
  } finally {
    conn.release();
  }
};


// Adicione esta função ao final do arquivo turmasModel.js
export const atualizarTurma = async (id, turma) => {
  const conn = await conexao.getConnection();

  try {
    // Verifica se a turma existe
    const [rows] = await conn.query(
      'SELECT id FROM turmas WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      throw new Error('Turma não encontrada');
    }

    await conn.query(
      `UPDATE turmas 
       SET nome = ?, ano_letivo = ?, professor_id = ?
       WHERE id = ?`,
      [
        turma.nome,
        turma.ano_letivo,
        turma.professor_id ?? null,
        id
      ]
    );

    return { sucesso: true, mensagem: 'Turma atualizada com sucesso' };
  } finally {
    conn.release();
  }
};


export const buscarTurmaPorIdModel = async (id) => {
  const conn = await conexao.getConnection();
  try {
    console.log(`Model - Buscando turma ID: ${id}`);
    const [rows] = await conn.query('SELECT * FROM turmas WHERE id = ?', [id]);
    console.log(`Model - Encontradas: ${rows.length} turma(s)`);
    return rows[0];
  } finally {
    conn.release();
  }
};