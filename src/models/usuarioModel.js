import { jest } from "@jest/globals";

// Mock do DB
const mockDb = {
  query: jest.fn(),
};

jest.unstable_mockModule("../config/db.js", () => ({
  default: mockDb,
}));

// Mock do bcrypt
const mockBcrypt = {
  hash: jest.fn(),
};

jest.unstable_mockModule("bcrypt", () => ({
  default: mockBcrypt,
}));

// Importa controller depois dos mocks
const {
  listarUsuarios,
  criarUsuario,
  buscarUsuarioPorId,
  atualizarUsuario,
  removerUsuario,
} = await import("../controllers/usuarioController.js");

// Mock do response
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Usuario Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // LISTAR
  test("Deve listar usuários", async () => {
    const req = {};
    const res = mockResponse();

    const usuarios = [{ id: 1, nome: "João" }];

    mockDb.query.mockResolvedValue([usuarios]);

    await listarUsuarios(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(usuarios);
  });

  test("Deve retornar erro ao listar usuários", async () => {
    const req = {};
    const res = mockResponse();

    mockDb.query.mockRejectedValue(new Error("Erro"));

    await listarUsuarios(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  // CRIAR
  test("Deve criar usuário com sucesso", async () => {
    const req = {
      body: {
        nome: "João",
        email: "joao@email.com",
        senha: "123",
      },
    };
    const res = mockResponse();

    mockBcrypt.hash.mockResolvedValue("hash123");
    mockDb.query.mockResolvedValue([{ insertId: 10 }]);

    await criarUsuario(req, res);

    expect(mockBcrypt.hash).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      mensagem: "Usuário criado com sucesso",
      id: 10,
    });
  });

  test("Deve retornar 400 se faltar campos", async () => {
    const req = { body: {} };
    const res = mockResponse();

    await criarUsuario(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("Deve retornar 409 se email duplicado", async () => {
    const req = {
      body: {
        nome: "João",
        email: "joao@email.com",
        senha: "123",
      },
    };
    const res = mockResponse();

    mockBcrypt.hash.mockResolvedValue("hash123");
    mockDb.query.mockRejectedValue({ code: "ER_DUP_ENTRY" });

    await criarUsuario(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
  });

  // BUSCAR POR ID
  test("Deve buscar usuário por ID", async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();

    const usuario = [{ id: 1, nome: "João" }];

    mockDb.query.mockResolvedValue([usuario]);

    await buscarUsuarioPorId(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(usuario[0]);
  });

  test("Deve retornar 404 se usuário não existir", async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();

    mockDb.query.mockResolvedValue([[]]);

    await buscarUsuarioPorId(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  // ATUALIZAR
  test("Deve atualizar usuário com sucesso", async () => {
    const req = {
      params: { id: 1 },
      body: { nome: "Novo", email: "novo@email.com" },
    };
    const res = mockResponse();

    mockDb.query
      .mockResolvedValueOnce([[{ id: 1 }]]) // exists
      .mockResolvedValueOnce([]); // update

    await atualizarUsuario(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("Deve retornar 404 ao atualizar usuário inexistente", async () => {
    const req = {
      params: { id: 1 },
      body: {},
    };
    const res = mockResponse();

    mockDb.query.mockResolvedValueOnce([[]]);

    await atualizarUsuario(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  // REMOVER
  test("Deve remover usuário com sucesso", async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();

    mockDb.query
      .mockResolvedValueOnce([[{ id: 1 }]]) // exists
      .mockResolvedValueOnce([]); // delete

    await removerUsuario(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("Deve retornar 404 ao remover usuário inexistente", async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();

    mockDb.query.mockResolvedValueOnce([[]]);

    await removerUsuario(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});