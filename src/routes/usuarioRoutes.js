import { Router } from "express";
import {
  listarUsuarios,
  criarUsuario,       
  buscarUsuarioPorId, 
  atualizarUsuario,   
  removerUsuario,     
} from "../controllers/usuarioController.js";
import { verificarToken } from "../middlewares/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Gerenciamento de usuários
 */

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 *       401:
 *         description: Não autorizado (token inválido ou ausente)
 *       500:
 *         description: Erro no servidor
 */
router.get("/", verificarToken, listarUsuarios);

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
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
 *                 example: senha123
 *               perfil:
 *                 type: string
 *                 example: admin
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       409:
 *         description: Email já cadastrado
 */
router.post("/", verificarToken, criarUsuario); 

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Busca um usuário por ID
 *     tags: [Usuários]
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
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 */
router.get("/:id", verificarToken, buscarUsuarioPorId); 

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Atualiza um usuário
 *     tags: [Usuários]
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
 *                 example: João Atualizado
 *               email:
 *                 type: string
 *                 example: joao.novo@email.com
 *               perfil:
 *                 type: string
 *                 example: admin
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.put("/:id", verificarToken, atualizarUsuario);

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Remove um usuário
 *     tags: [Usuários]
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
 *         description: Usuário removido com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.delete("/:id", verificarToken, removerUsuario); 

export default router;