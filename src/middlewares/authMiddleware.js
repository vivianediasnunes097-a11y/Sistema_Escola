// import jwt from "jsonwebtoken";
// import { jwtConfig } from "../config/jwt.js";

// export const verificarToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     return res.status(401).json({
//       mensagem: "Token não informado",
//     });
//   }

//   if (!authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({
//       mensagem: "Formato inválido. Use: Bearer <token>",
//     });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, jwtConfig.secret);

//     req.usuario = decoded;
//     next();
//   } catch {
//     return res.status(401).json({
//       mensagem: "Token inválido ou expirado",
//     });
//   }
// };

// export default verificarToken;



import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.js";

const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      mensagem: "Token não informado",
    });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      mensagem: "Formato inválido. Use: Bearer <token>",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, jwtConfig.secret);

    req.usuario = decoded;
    next();
  } catch {
    return res.status(401).json({
      mensagem: "Token inválido ou expirado",
    });
  }
};

export { verificarToken };

export default verificarToken;