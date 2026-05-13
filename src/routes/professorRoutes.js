import { Router } from "express";
import {
  listarProfessores,
  criarProfessor,
  atualizarProfessor,
  removerProfessor,
  buscarProfessorPorId, 
} from "../controllers/professorController.js";

import { verificarToken } from "../middlewares/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Professores
 *   description: Gerenciamento de professores
 */

/**
 * @swagger
 * /professores:
 *   get:
 *     summary: Lista todos os professores
 *     tags: [Professores]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de professores
 *       500:
 *         description: Erro no servidor
 */
router.get("/", verificarToken, listarProfessores);

/**
 * @swagger
 * /professores/{id}:
 *   get:
 *     summary: Busca um professor por ID
 *     tags: [Professores]
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
 *         description: Professor encontrado
 *       404:
 *         description: Professor não encontrado
 */
router.get("/:id", verificarToken, buscarProfessorPorId); // ✅ adicionado

/**
 * @swagger
 * /professores:
 *   post:
 *     summary: Cria um novo professor
 *     tags: [Professores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Maria Souza
 *               email:
 *                 type: string
 *                 example: maria@email.com
 *               disciplina_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Professor criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/", verificarToken, criarProfessor);

/**
 * @swagger
 * /professores/{id}:
 *   put:
 *     summary: Atualiza um professor
 *     tags: [Professores]
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
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               disciplina_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Professor atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.put("/:id", verificarToken, atualizarProfessor);

/**
 * @swagger
 * /professores/{id}:
 *   delete:
 *     summary: Remove um professor
 *     tags: [Professores]
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
 *         description: Professor removido com sucesso
 *       404:
 *         description: Professor não encontrado
 */
router.delete("/:id", verificarToken, removerProfessor);

export default router;