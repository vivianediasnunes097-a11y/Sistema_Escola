process.env.NODE_ENV = "test";
import { jest } from "@jest/globals";

const mockModel = {
  listarTurmas: jest.fn(),
  criarTurma: jest.fn(),
  deletarTurma: jest.fn(),
  atualizarTurma: jest.fn(),
  buscarTurmaPorIdModel: jest.fn(),
};

jest.unstable_mockModule("../models/turmasModel.js", () => mockModel);

const {
  listarTurmas,
  criarTurma,
  atualizarTurma,
  deletarTurma,
  buscarTurmaPorId,
} = await import("../controllers/turmasController.js");

// Mock do response
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Turmas Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // LISTAR
  test("Deve listar turmas com sucesso", async () => {
    const req = {};
    const res = mockResponse();

    const turmas = [{ id: 1, nome: "1º Ano" }];

    mockModel.listarTurmas.mockResolvedValue(turmas);

    await listarTurmas(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(turmas);
  });

  test("Deve retornar erro ao listar turmas", async () => {
    const req = {};
    const res = mockResponse();

    mockModel.listarTurmas.mockRejectedValue(new Error("Erro"));

    await listarTurmas(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  // BUSCAR POR ID
  test("Deve buscar turma por ID", async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();

    const turma = { id: 1, nome: "1º Ano" };

    mockModel.buscarTurmaPorIdModel.mockResolvedValue(turma);

    await buscarTurmaPorId(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(turma);
  });

  test("Deve retornar 404 se turma não existir", async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();

    mockModel.buscarTurmaPorIdModel.mockResolvedValue(undefined);

    await buscarTurmaPorId(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  // CRIAR
  test("Deve criar turma com sucesso", async () => {
    const req = {
      body: {
        nome: "2º Ano",
        ano: 2025,
        professor_id: 1,
      },
    };
    const res = mockResponse();

    mockModel.criarTurma.mockResolvedValue({ insertId: 10 });

    await criarTurma(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      mensagem: "Turma criada com sucesso",
      id: 10,
    });
  });

  test("Deve retornar 400 se faltar campos obrigatórios", async () => {
    const req = {
      body: { nome: "" },
    };
    const res = mockResponse();

    await criarTurma(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("Deve retornar erro ao criar turma", async () => {
    const req = {
      body: {
        nome: "2º Ano",
        ano: 2025,
      },
    };
    const res = mockResponse();

    mockModel.criarTurma.mockRejectedValue(new Error("Erro"));

    await criarTurma(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  // ATUALIZAR
  test("Deve atualizar turma com sucesso", async () => {
    const req = {
      params: { id: 1 },
      body: {
        nome: "3º Ano",
        ano: 2025,
        professor_id: 2,
      },
    };
    const res = mockResponse();

    mockModel.atualizarTurma.mockResolvedValue();

    await atualizarTurma(req, res);

    expect(mockModel.atualizarTurma).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("Deve retornar erro ao atualizar turma", async () => {
    const req = {
      params: { id: 1 },
      body: {},
    };
    const res = mockResponse();

    mockModel.atualizarTurma.mockRejectedValue(new Error("Erro"));

    await atualizarTurma(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  // DELETAR
  test("Deve deletar turma com sucesso", async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();

    mockModel.deletarTurma.mockResolvedValue();

    await deletarTurma(req, res);

    expect(mockModel.deletarTurma).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("Deve retornar erro ao deletar turma", async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();

    mockModel.deletarTurma.mockRejectedValue(new Error("Erro"));

    await deletarTurma(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});