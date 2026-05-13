import { Router } from "express";
import {
  listarAlunos,
  buscarAlunoPorId,
  criarAluno,
  atualizarAluno,
  removerAluno,
} from "../controllers/alunosController.js";

import { verificarToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(verificarToken);

/**
 * @swagger
 * tags:
 *   name: Alunos
 *   description: Endpoints para gerenciamento de alunos
 */

/**
 * @swagger
 * /alunos:
 *   get:
 *     summary: Lista todos os alunos
 *     tags: [Alunos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de alunos
 *       500:
 *         description: Erro no servidor
 */
router.get("/", listarAlunos);

/**
 * @swagger
 * /alunos/{id}:
 *   get:
 *     summary: Busca um aluno por ID
 *     tags: [Alunos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Aluno encontrado
 *       404:
 *         description: Aluno não encontrado
 */
router.get("/:id", buscarAlunoPorId);

/**
 * @swagger
 * /alunos:
 *   post:
 *     summary: Cria um novo aluno
 *     tags: [Alunos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               turma_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Aluno criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/", criarAluno);

/**
 * @swagger
 * /alunos/{id}:
 *   put:
 *     summary: Atualiza um aluno
 *     tags: [Alunos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               turma_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Aluno atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.put("/:id", atualizarAluno);

/**
 * @swagger
 * /alunos/{id}:
 *   delete:
 *     summary: Remove um aluno
 *     tags: [Alunos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Aluno removido com sucesso
 *       404:
 *         description: Aluno não encontrado
 */
router.delete("/:id", removerAluno);
export default router;