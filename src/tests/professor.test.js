import { jest } from "@jest/globals";

// Mock do model (ANTES de importar o controller)
const mockModel = {
  buscarTodosProfessoresModel: jest.fn(),
  buscarProfessorPorIdModel: jest.fn(),
  criarProfessorModel: jest.fn(),
  atualizarProfessorModel: jest.fn(),
  deletarProfessorModel: jest.fn(),
};

jest.unstable_mockModule("../models/professorModel.js", () => mockModel);

// Importa o controller depois do mock
const {
  listarProfessores,
  buscarProfessorPorId,
  criarProfessor,
  atualizarProfessor,
  removerProfessor,
} = await import("../controllers/professorController.js");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Professor Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Deve listar professores", async () => {
    const req = {};
    const res = mockResponse();

    const professores = [{ id: 1, nome: "Carlos" }];

    mockModel.buscarTodosProfessoresModel.mockResolvedValue(professores);

    await listarProfessores(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(professores);
  });

  test("Deve retornar erro ao listar professores", async () => {
    const req = {};
    const res = mockResponse();

    mockModel.buscarTodosProfessoresModel.mockRejectedValue(new Error("Erro"));

    await listarProfessores(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  test("Deve buscar professor por ID", async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();

    const professor = { id: 1, nome: "Ana" };

    mockModel.buscarProfessorPorIdModel.mockResolvedValue(professor);

    await buscarProfessorPorId(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(professor);
  });

  test("Deve retornar 404 se professor não existir", async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();

    mockModel.buscarProfessorPorIdModel.mockResolvedValue(undefined);

    await buscarProfessorPorId(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  test("Deve criar professor com sucesso", async () => {
    const req = {
      body: {
        nome: "João",
        email: "joao@email.com",
        telefone: "123456",
        especialidade: "Matemática",
      },
    };
    const res = mockResponse();

    mockModel.criarProfessorModel.mockResolvedValue({ insertId: 10 });

    await criarProfessor(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      mensagem: "Professor criado com sucesso",
      id: 10,
    });
  });

  test("Deve retornar 400 se faltar campos obrigatórios", async () => {
    const req = {
      body: {
        nome: "João",
      },
    };
    const res = mockResponse();

    await criarProfessor(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("Deve retornar erro ao criar professor", async () => {
    const req = {
      body: {
        nome: "João",
        email: "joao@email.com",
        telefone: "123456",
        especialidade: "Matemática",
      },
    };
    const res = mockResponse();

    mockModel.criarProfessorModel.mockRejectedValue(new Error("Erro"));

    await criarProfessor(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  test("Deve atualizar professor com sucesso", async () => {
    const req = {
      params: { id: 1 },
      body: {
        nome: "Carlos",
        email: "carlos@email.com",
        telefone: "999",
        especialidade: "Física",
      },
    };
    const res = mockResponse();

    mockModel.buscarProfessorPorIdModel.mockResolvedValue({ id: 1 });

    await atualizarProfessor(req, res);

    expect(mockModel.atualizarProfessorModel).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("Deve retornar 404 ao atualizar professor inexistente", async () => {
    const req = {
      params: { id: 1 },
      body: {},
    };
    const res = mockResponse();

    mockModel.buscarProfessorPorIdModel.mockResolvedValue(undefined);

    await atualizarProfessor(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  // REMOVER
  test("Deve remover professor com sucesso", async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();

    mockModel.buscarProfessorPorIdModel.mockResolvedValue({ id: 1 });

    await removerProfessor(req, res);

    expect(mockModel.deletarProfessorModel).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("Deve retornar 404 ao remover professor inexistente", async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();

    mockModel.buscarProfessorPorIdModel.mockResolvedValue(undefined);

    await removerProfessor(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});