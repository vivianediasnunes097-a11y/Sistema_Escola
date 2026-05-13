import { jest } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

jest.unstable_mockModule(path.join(__dirname, '../models/alunosModel.js'), () => ({
  listarAlunosModel: jest.fn(),
  buscarAlunoPorIdModel: jest.fn(),
  criarAlunoModel: jest.fn(),
  atualizarAlunoModel: jest.fn(),
  removerAlunoModel: jest.fn(),
}));

const { 
  listarAlunos, 
  buscarAlunoPorId, 
  criarAluno, 
  atualizarAluno, 
  removerAluno 
} = await import(path.join(__dirname, '../controllers/alunosController.js'));

const {
  listarAlunosModel,
  buscarAlunoPorIdModel,
  criarAlunoModel,
  atualizarAlunoModel,
  removerAlunoModel,
} = await import(path.join(__dirname, '../models/alunosModel.js'));

describe('alunoController', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      params: {},
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    jest.clearAllMocks();
  });

  describe('listarAlunos', () => {
    it('deve listar todos os alunos com sucesso', async () => {
      const alunosMock = [
        { id: 1, nome: 'João Silva', email: 'joao@email.com' },
        { id: 2, nome: 'Maria Santos', email: 'maria@email.com' },
      ];
      listarAlunosModel.mockResolvedValue(alunosMock);

      await listarAlunos(req, res);

      expect(listarAlunosModel).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(alunosMock);
    });

    it('deve retornar erro 500 quando falhar ao listar alunos', async () => {
      const erro = new Error('Erro no banco de dados');
      listarAlunosModel.mockRejectedValue(erro);

      await listarAlunos(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        mensagem: 'Erro ao listar alunos',
        erro: erro.message,
      });
    });
  });

  describe('buscarAlunoPorId', () => {
    it('deve buscar um aluno por ID com sucesso', async () => {
      const alunoMock = { id: 1, nome: 'João Silva', email: 'joao@email.com' };
      req.params.id = '1';
      buscarAlunoPorIdModel.mockResolvedValue(alunoMock);

      await buscarAlunoPorId(req, res);

      expect(buscarAlunoPorIdModel).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(alunoMock);
    });

    it('deve retornar 404 quando aluno não for encontrado', async () => {
      req.params.id = '999';
      buscarAlunoPorIdModel.mockResolvedValue(null);

      await buscarAlunoPorId(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        mensagem: 'Aluno não encontrado',
      });
    });

    it('deve retornar erro 500 quando falhar ao buscar aluno', async () => {
      req.params.id = '1';
      const erro = new Error('Erro no banco de dados');
      buscarAlunoPorIdModel.mockRejectedValue(erro);

      await buscarAlunoPorId(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        mensagem: 'Erro ao buscar aluno',
        erro: erro.message,
      });
    });
  });

  describe('criarAluno', () => {
    it('deve criar um novo aluno com sucesso', async () => {
      const alunoData = {
        nome: 'João Silva',
        cpf: '123.456.789-00',
        email: 'joao@email.com',
        telefone: '(11) 99999-9999',
        data_nascimento: '2000-01-01',
        turma_id: 1,
        status: 'ativo',
      };
      req.body = alunoData;
      criarAlunoModel.mockResolvedValue(1);

      await criarAluno(req, res);

      expect(criarAlunoModel).toHaveBeenCalledWith(alunoData);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        mensagem: 'Aluno cadastrado com sucesso',
        id: 1,
      });
    });

    it('deve retornar 400 quando campos obrigatórios estiverem faltando', async () => {
      req.body = {
        nome: 'João Silva',
        // cpf faltando
        email: 'joao@email.com',
        turma_id: 1,
      };

      await criarAluno(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        mensagem: 'Campos obrigatórios faltando',
      });
      expect(criarAlunoModel).not.toHaveBeenCalled();
    });

    it('deve retornar 500 quando falhar ao criar aluno', async () => {
      const alunoData = {
        nome: 'João Silva',
        cpf: '123.456.789-00',
        email: 'joao@email.com',
        turma_id: 1,
      };
      req.body = alunoData;
      const erro = new Error('Erro ao inserir no banco');
      criarAlunoModel.mockRejectedValue(erro);

      await criarAluno(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        mensagem: 'Erro ao cadastrar aluno',
        erro: erro.message,
      });
    });
  });

  describe('atualizarAluno', () => {
    it('deve atualizar um aluno com sucesso', async () => {
      const alunoExistente = { id: 1, nome: 'João Antigo' };
      const alunoAtualizado = {
        nome: 'João Silva Atualizado',
        cpf: '123.456.789-00',
        email: 'joao.novo@email.com',
        telefone: '(11) 88888-8888',
        data_nascimento: '2000-01-01',
        turma_id: 2,
        status: 'inativo',
      };
      
      req.params.id = '1';
      req.body = alunoAtualizado;
      buscarAlunoPorIdModel.mockResolvedValue(alunoExistente);
      atualizarAlunoModel.mockResolvedValue({ affectedRows: 1 });

      await atualizarAluno(req, res);

      expect(buscarAlunoPorIdModel).toHaveBeenCalledWith('1');
      expect(atualizarAlunoModel).toHaveBeenCalledWith('1', alunoAtualizado);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        mensagem: 'Aluno atualizado com sucesso',
      });
    });

    it('deve retornar 404 quando aluno não existe para atualizar', async () => {
      req.params.id = '999';
      req.body = { nome: 'Teste' };
      buscarAlunoPorIdModel.mockResolvedValue(null);

      await atualizarAluno(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        mensagem: 'Aluno não encontrado',
      });
      expect(atualizarAlunoModel).not.toHaveBeenCalled();
    });

    it('deve retornar 500 quando falhar ao atualizar aluno', async () => {
      const alunoExistente = { id: 1, nome: 'João' };
      req.params.id = '1';
      req.body = { nome: 'João Atualizado' };
      buscarAlunoPorIdModel.mockResolvedValue(alunoExistente);
      
      const erro = new Error('Erro ao atualizar');
      atualizarAlunoModel.mockRejectedValue(erro);

      await atualizarAluno(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        mensagem: 'Erro ao atualizar aluno',
        erro: erro.message,
      });
    });
  });

  describe('removerAluno', () => {
    it('deve remover um aluno com sucesso', async () => {
      const alunoExistente = { id: 1, nome: 'João Silva' };
      req.params.id = '1';
      buscarAlunoPorIdModel.mockResolvedValue(alunoExistente);
      removerAlunoModel.mockResolvedValue({ affectedRows: 1 });

      await removerAluno(req, res);

      expect(buscarAlunoPorIdModel).toHaveBeenCalledWith('1');
      expect(removerAlunoModel).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        mensagem: 'Aluno removido com sucesso',
      });
    });

    it('deve retornar 404 quando aluno não existe para remover', async () => {
      req.params.id = '999';
      buscarAlunoPorIdModel.mockResolvedValue(null);

      await removerAluno(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        mensagem: 'Aluno não encontrado',
      });
      expect(removerAlunoModel).not.toHaveBeenCalled();
    });

    it('deve retornar 500 quando falhar ao remover aluno', async () => {
      const alunoExistente = { id: 1, nome: 'João' };
      req.params.id = '1';
      buscarAlunoPorIdModel.mockResolvedValue(alunoExistente);
      
      const erro = new Error('Erro ao remover do banco');
      removerAlunoModel.mockRejectedValue(erro);

      await removerAluno(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        mensagem: 'Erro ao remover aluno',
        erro: erro.message,
      });
    });
  });
});