import { jest } from "@jest/globals";

// MOCKS PRIMEIRO
const mockDb = {
  query: jest.fn(),
};

jest.unstable_mockModule("../config/db.js", () => ({
  default: mockDb,
}));

const mockBcrypt = {
  hash: jest.fn(),
};

jest.unstable_mockModule("bcrypt", () => ({
  default: mockBcrypt,
}));

// IMPORT DEPOIS DOS MOCKS
let controller;

beforeAll(async () => {
  controller = await import("../controllers/usuarioController.js");
});

// MOCK RESPONSE
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

  test("Deve listar usuários", async () => {
    const req = {};
    const res = mockResponse();

    mockDb.query.mockResolvedValue([[{ id: 1 }]]);

    await controller.listarUsuarios(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });
});