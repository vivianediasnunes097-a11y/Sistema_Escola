import { Router } from "express";
import { login, registrar } from "../controllers/authController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticação de usuários
 */

/**
 * @swagger
 * /auth/registrar:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               senha:
 *                 type: string
 *                 example: 123456
 *               perfil:
 *                 type: string
 *                 example: admin
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/registrar", registrar);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza login do usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               senha:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/login", login);
export default router;