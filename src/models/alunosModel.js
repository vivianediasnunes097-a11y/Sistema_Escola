import conexao from "../config/db.js";
export const listarAlunosModel = async () => {
  const [rows] = await conexao.query("SELECT * FROM alunos");
  return rows;
};

export const buscarAlunoPorIdModel = async (id) => {
  const [rows] = await conexao.query(
    "SELECT * FROM alunos WHERE id = ?",
    [id]
  );
  return rows[0];
};

export const criarAlunoModel = async ({
  nome,
  cpf,
  email,
  telefone,
  data_nascimento,
  turma_id,
  status,
}) => {
  const [result] = await conexao.query(
    `INSERT INTO alunos 
     (nome, cpf, email, telefone, data_nascimento, turma_id, status)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      nome,
      cpf,
      email,
      telefone,
      data_nascimento,
      turma_id,
      status || "ativo",
    ]
  );

  return result.insertId;
};

// ATUALIZAR
export const atualizarAlunoModel = async (id, dados) => {
  const {
    nome,
    cpf,
    email,
    telefone,
    data_nascimento,
    turma_id,
    status,
  } = dados;

  await conexao.query(
    `UPDATE alunos SET
      nome = ?, cpf = ?, email = ?, telefone = ?, 
      data_nascimento = ?, turma_id = ?, status = ?
     WHERE id = ?`,
    [
      nome,
      cpf,
      email,
      telefone,
      data_nascimento,
      turma_id,
      status,
      id,
    ]
  );
};

// REMOVER
export const removerAlunoModel = async (id) => {
  await conexao.query("DELETE FROM alunos WHERE id = ?", [id]);
};