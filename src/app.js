// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://sistema-de-escola.vercel.app",
//       "https://bootleg-detector-clad.ngrok-free.dev",
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: [
//       "Content-Type",
//       "Authorization",
//       "ngrok-skip-browser-warning",
//     ],
//     credentials: true,
//   })
// );

import express from "express";
import cors from "cors";

const app = express(); 
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://sistema-de-escola.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "ngrok-skip-browser-warning"
  ]
}));

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Api funcionando" });
});

app.get("/teste", (req, res) => {
  res.status(200).json({ ok: true });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import alunosRoute from "./routes/alunosRoute.js";
import turmasRoute from "./routes/turmasRoute.js";
import notasRoutes from "./routes/notasRoute.js";
import professorRoutes from "./routes/professorRoutes.js";
import disciplinasRoutes from "./routes/disciplinasRoute.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";

app.use("/alunos", alunosRoute);
app.use("/turmas", turmasRoute);
app.use("/notas", notasRoute);
app.use("/professores", professorRoute);
app.use("/disciplinas", disciplinasRoute);
app.use("/usuarios", usuariosRoute);

app.get("/", (req, res) => {
  res.json({ message: "API funcionando!" });
});

export default app; 