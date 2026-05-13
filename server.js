import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/config/swagger.js";
import conexao from "./src/config/db.js";

import authRoute from "./src/routes/authRoute.js";
import usuarioRoutes from "./src/routes/usuarioRoutes.js";
import professorRoutes from "./src/routes/professorRoutes.js";
import alunoRoutes from "./src/routes/alunosRoute.js";
import turmaRoutes from "./src/routes/turmasRoute.js";
import disciplinaRoutes from "./src/routes/disciplinasRoute.js";
import notasRoutes from "./src/routes/notasRoute.js";

dotenv.config({ quiet: true });

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://sistema-de-escola.vercel.app",
      "https://bootleg-detector-clad.ngrok-free.dev",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "ngrok-skip-browser-warning",
    ],
  })
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.status(200).json({
    msg: "API funcionando 🚀",
  });
});

app.get("/teste", (req, res) => {
  res.status(200).json({
    ok: true,
  });
});

app.use("/auth", authRoute);
app.use("/usuarios", usuarioRoutes);
app.use("/professores", professorRoutes);
app.use("/alunos", alunoRoutes);
app.use("/turmas", turmaRoutes);
app.use("/disciplinas", disciplinaRoutes);
app.use("/notas", notasRoutes);

app.use((err, req, res, next) => {
  console.error("Erro:", err);

  res.status(err.status || 500).json({
    mensagem: err.message || "Erro interno no servidor",
  });
});

export default app;

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;

  (async () => {
    try {
      const conn = await conexao.getConnection();
      console.log("✅ Banco conectado com sucesso");
      conn.release();
    } catch (err) {
      console.error("❌ Erro ao conectar no banco:", err.message);
    }
  })();

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📚 Swagger disponível em http://localhost:${PORT}/api-docs`);
  });
}