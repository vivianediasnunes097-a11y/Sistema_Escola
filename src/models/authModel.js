import conexao from "../config/db.js";

export const buscarUsuarioPorEmail = async (email) => {
  let conn;

  try {
    conn = await conexao.getConnection();

    const [rows] = await conn.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );

    return rows;
  } finally {
    if (conn) conn.release();
  }
};

export const criarUsuario = async ({
  nome,
  email,
  senha,
  perfil,
}) => {
  let conn;

  try {
    conn = await conexao.getConnection();

    const [result] = await conn.query(
      `INSERT INTO usuarios (nome, email, senha, perfil)
       VALUES (?, ?, ?, ?)`,
      [nome, email, senha, perfil]
    );

    return result;
  } finally {
    if (conn) conn.release();
  }
};