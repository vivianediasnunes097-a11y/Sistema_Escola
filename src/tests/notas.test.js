import { jest } from "@jest/globals";

// Mock do model (ANTES de importar o controller)
const mockModel = {
  listarNotasModel: jest.fn(),
  buscarNotaPorIdModel: jest.fn(),
  criarNotaModel: jest.fn(),
  atualizarNotaModel: jest.fn(),
  removerNotaModel: jest.fn(),
};

jest.unstable_mockModule("../models/notasModel.js", () => mockModel);

const {
  listar,
  buscarPorId,
  criar,
  atualizar,
  remover,
} = await import("../controllers/notasController.js");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Notas Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Deve listar notas com sucesso", async () => {
    const req = {};
    const res = mockResponse();

    const notas = [
      {
        id: 1,
        aluno: "João",
        disciplina: "Matemática",
        nota: 8,
      },
    ];

    mockModel.listarNotasModel.mockResolvedValue(notas);

    await listar(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(notas);
  });

  test("Deve retornar erro ao listar notas", async () => {
    const req = {};
    const res = mockResponse();

    mockModel.listarNotasModel.mockRejectedValue(
      new Error("Erro")
    );

    await listar(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  test("Deve buscar nota por ID", async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();

    const nota = { id: 1, nota: 9 };

    mockModel.buscarNotaPorIdModel.mockResolvedValue(nota);

    await buscarPorId(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(nota);
  });

  test("Deve retornar 404 se nota não existir", async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();

    mockModel.buscarNotaPorIdModel.mockResolvedValue(null);

    await buscarPorId(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  test("Deve criar nota com sucesso", async () => {
    const req = {
      body: {
        aluno_id: 1,
        disciplina_id: 2,
        nota: 10,
        bimestre: 1,
        observacao: "Ótimo",
      },
    };
    const res = mockResponse();

    mockModel.criarNotaModel.mockResolvedValue(5);

    await criar(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      mensagem: "Nota cadastrada com sucesso",
      id: 5,
    });
  });

  test("Deve retornar erro ao criar nota", async () => {
    const req = { body: {} };
    const res = mockResponse();

    mockModel.criarNotaModel.mockRejectedValue(
      new Error("Erro")
    );

    await criar(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  test("Deve atualizar nota com sucesso", async () => {
    const req = {
      params: { id: 1 },
      body: {
        aluno_id: 1,
        disciplina_id: 2,
        nota: 7,
        bimestre: 2,
        observacao: "OK",
      },
    };
    const res = mockResponse();

    mockModel.atualizarNotaModel.mockResolvedValue(1);

    await atualizar(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("Deve retornar 404 ao atualizar nota inexistente", async () => {
    const req = {
      params: { id: 1 },
      body: {},
    };
    const res = mockResponse();

    mockModel.atualizarNotaModel.mockResolvedValue(0);

    await atualizar(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  test("Deve remover nota com sucesso", async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();

    mockModel.removerNotaModel.mockResolvedValue(1);

    await remover(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("Deve retornar 404 ao remover nota inexistente", async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();

    mockModel.removerNotaModel.mockResolvedValue(0);

    await remover(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});