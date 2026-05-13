import dontev from "dotenv";
dontev.config();

export const jwtConfig = {
    secret : process.env.JWT_SECRET || "segredo_super_secreto"
}