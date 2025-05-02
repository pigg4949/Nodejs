import dotenv from "dotenv";
dotenv.config();

export const config = {
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresInSec: parseInt(process.env.JWT_EXPIRES_SEC), // 여기가 핵심
  },
  bcrypt: {
    saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS),
  },
  server: {
    port: parseInt(process.env.HOST_PORT),
  },
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
};
