import { Router } from "express";
import {
  listarTurmas,
  criarTurma,
  atualizarTurma,
  deletarTurma,
  buscarTurmaPorId, 
} from "../controllers/turmasController.js";

import { verificarToken } from "../middlewares/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Turmas
 *   description: Gerenciamento de turmas
 */

/**
 * @swagger
 * /turmas:
 *   get:
 *     summary: Lista todas as turmas
 *     tags: [Turmas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de turmas
 *       500:
 *         description: Erro no servidor
 */
router.get("/", verificarToken, listarTurmas);

/**
 * @swagger
 * /turmas/{id}:
 *   get:
 *     summary: Busca uma turma por ID
 *     tags: [Turmas]
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
 *         description: Turma encontrada
 *       404:
 *         description: Turma não encontrada
 */
router.get("/:id", verificarToken, buscarTurmaPorId); 
/**
 * @swagger
 * /turmas:
 *   post:
 *     summary: Cria uma nova turma
 *     tags: [Turmas]
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
 *               - ano_letivo
 *             properties:
 *               nome:
 *                 type: string
 *                 example: 3º Ano A
 *               ano_letivo:
 *                 type: integer
 *                 example: 2026
 *               professor_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Turma criada com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/", verificarToken, criarTurma);

/**
 * @swagger
 * /turmas/{id}:
 *   put:
 *     summary: Atualiza uma turma
 *     tags: [Turmas]
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
 *                 example: 2º Ano B
 *               ano_letivo:
 *                 type: integer
 *                 example: 2025
 *               professor_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Turma atualizada com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.put("/:id", verificarToken, atualizarTurma);

/**
 * @swagger
 * /turmas/{id}:
 *   delete:
 *     summary: Remove uma turma
 *     tags: [Turmas]
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
 *         description: Turma removida com sucesso
 *       404:
 *         description: Turma não encontrada
 */
router.delete("/:id", verificarToken, deletarTurma);

export default router;