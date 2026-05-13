import { Router } from "express";
import * as disciplinaController from "../controllers/disciplinasController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Disciplinas
 *   description: Gerenciamento de disciplinas
 */

/**
 * @swagger
 * /disciplinas:
 *   get:
 *     summary: Lista todas as disciplinas
 *     tags: [Disciplinas]
 *     responses:
 *       200:
 *         description: Lista de disciplinas
 *       500:
 *         description: Erro no servidor
 */
router.get("/", disciplinaController.listarDisciplinas);

/**
 * @swagger
 * /disciplinas/{id}:
 *   get:
 *     summary: Busca uma disciplina por ID
 *     tags: [Disciplinas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Disciplina encontrada
 *       404:
 *         description: Disciplina não encontrada
 */
router.get("/:id", disciplinaController.buscarDisciplinaPorId);

/**
 * @swagger
 * /disciplinas:
 *   post:
 *     summary: Cria uma nova disciplina
 *     tags: [Disciplinas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Matemática
 *               carga_horaria:
 *                 type: integer
 *                 example: 60
 *     responses:
 *       201:
 *         description: Disciplina criada com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/", disciplinaController.criarDisciplina);

/**
 * @swagger
 * /disciplinas/{id}:
 *   put:
 *     summary: Atualiza uma disciplina
 *     tags: [Disciplinas]
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
 *                 example: Física
 *               carga_horaria:
 *                 type: integer
 *                 example: 80
 *     responses:
 *       200:
 *         description: Disciplina atualizada com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.put("/:id", disciplinaController.atualizarDisciplina);

/**
 * @swagger
 * /disciplinas/{id}:
 *   delete:
 *     summary: Deleta uma disciplina
 *     tags: [Disciplinas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Disciplina deletada com sucesso
 *       404:
 *         description: Disciplina não encontrada
 */
router.delete("/:id", disciplinaController.deletarDisciplina);

export default router;