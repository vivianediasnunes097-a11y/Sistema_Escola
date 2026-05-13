// import mysql from "mysql2/promise";
// import dotenv from "dotenv";

// dotenv.config();

// const conexao = mysql.createPool({
//     host: process.env.DB_HOST,
//     port: Number(process.env.DB_PORT),
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,

//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
//     timezone: "Z"
// });

// (async () => {
//     try {
//         const connection = await conexao.getConnection();

//         console.log("Conectado com o banco de dados");

//         const [rows] = await connection.query("SELECT 1 AS teste");

//         console.log("Teste banco:", rows);

//         connection.release();
//     } catch (error) {
//         console.log("Erro ao conectar no banco:");
//         console.log(error);
//     }
// })();

// export default conexao;


import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const conexao = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: "Z"
});


export default conexao;