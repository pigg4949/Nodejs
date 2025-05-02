import mysql from "mysql2";
import { config } from "./config.mjs";

const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  database: config.db.database,
  password: config.db.password,
});
// mysql.createConnection : 순간순간 접속하게 하는 메서드
export const db = pool.promise();
