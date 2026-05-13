import { Router } from "express";
import * as notasController from "../controllers/notasController.js";
import { verificarToken } from "../middlewares/authMiddleware.js";

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Notas
 *   description: Gerenciamento de notas dos alunos
 */

/**
 * @swagger
 * /notas:
 *   get:
 *     summary: Lista todas as notas
 *     tags: [Notas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de notas
 *       500:
 *         description: Erro no servidor
 */
router.get("/", verificarToken, notasController.listar);

/**
 * @swagger
 * /notas/{id}:
 *   get:
 *     summary: Busca uma nota por ID
 *     tags: [Notas]
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
 *         description: Nota encontrada
 *       404:
 *         description: Nota não encontrada
 */
router.get("/:id", verificarToken, notasController.buscarPorId);

/**
 * @swagger
 * /notas:
 *   post:
 *     summary: Cria uma nova nota
 *     tags: [Notas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - aluno_id
 *               - disciplina_id
 *               - valor
 *             properties:
 *               aluno_id:
 *                 type: integer
 *                 example: 1
 *               disciplina_id:
 *                 type: integer
 *                 example: 2
 *               valor:
 *                 type: number
 *                 example: 8.5
 *     responses:
 *       201:
 *         description: Nota criada com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/", verificarToken, notasController.criar);

/**
 * @swagger
 * /notas/{id}:
 *   put:
 *     summary: Atualiza uma nota
 *     tags: [Notas]
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
 *               aluno_id:
 *                 type: integer
 *                 example: 1
 *               disciplina_id:
 *                 type: integer
 *                 example: 2
 *               valor:
 *                 type: number
 *                 example: 9.0
 *     responses:
 *       200:
 *         description: Nota atualizada com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.put("/:id", verificarToken, notasController.atualizar);

/**
 * @swagger
 * /notas/{id}:
 *   delete:
 *     summary: Remove uma nota
 *     tags: [Notas]
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
 *         description: Nota removida com sucesso
 *       404:
 *         description: Nota não encontrada
 */
router.delete("/:id", verificarToken, notasController.remover);
export default router;