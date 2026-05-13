import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Escola",
      version: "1.0.0",
      description: "API para gerenciamento escolar: usuários, professores, alunos, turmas, disciplinas e notas.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    "./server.js",
    "./src/routes/*.js",
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;