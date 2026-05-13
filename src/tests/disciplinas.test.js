import { jest } from "@jest/globals";

const mockModel = {
  findAllDisciplinas: jest.fn(),
  findDisciplinaById: jest.fn(),
  createDisciplina: jest.fn(),
  updateDisciplina: jest.fn(),
  deleteDisciplina: jest.fn()
};

jest.unstable_mockModule("../models/disciplinasModel.js", () => mockModel);

const {
  listarDisciplinas,
  buscarDisciplinaPorId,
  criarDisciplina,
  atualizarDisciplina,
  deletarDisciplina
} = await import("../controllers/disciplinasController.js");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Disciplinas Controller", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Deve listar disciplinas", async () => {
    const req = {};
    const res = mockResponse();

    const data = [{ id: 1, nome: "Matemática", carga_horaria: 60 }];

    mockModel.findAllDisciplinas.mockResolvedValue(data);

    await listarDisciplinas(req, res);

    expect(res.json).toHaveBeenCalledWith(data);
  });

  test("Deve buscar por ID", async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();

    const disciplina = { id: 1, nome: "Física", carga_horaria: 80 };

    mockModel.findDisciplinaById.mockResolvedValue(disciplina);

    await buscarDisciplinaPorId(req, res);

    expect(res.json).toHaveBeenCalledWith(disciplina);
  });

  test("Retorna 404 se não encontrar", async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();

    mockModel.findDisciplinaById.mockResolvedValue(undefined);

    await buscarDisciplinaPorId(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  test("Cria disciplina", async () => {
    const req = {
      body: { nome: "Química", carga_horaria: 70 }
    };
    const res = mockResponse();

    mockModel.createDisciplina.mockResolvedValue(5);

    await criarDisciplina(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
  });

  test("Valida campos obrigatórios", async () => {
    const req = { body: {} };
    const res = mockResponse();

    await criarDisciplina(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("Atualiza disciplina", async () => {
    const req = {
      params: { id: 1 },
      body: { nome: "Bio", carga_horaria: 40 }
    };
    const res = mockResponse();

    mockModel.findDisciplinaById.mockResolvedValue({ id: 1 });

    await atualizarDisciplina(req, res);

    expect(mockModel.updateDisciplina).toHaveBeenCalled();
  });

  test("Deleta disciplina", async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();

    mockModel.findDisciplinaById.mockResolvedValue({ id: 1 });

    await deletarDisciplina(req, res);

    expect(mockModel.deleteDisciplina).toHaveBeenCalledWith(1);
  });

});