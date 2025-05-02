import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import userRouter from "./userRouter.mjs";
import postRouter from "./postRouter.mjs";

dotenv.config();

const app = express();
const port = process.env.HOST_PORT || 8080;

// 경로 관련 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 미들웨어
app.use(cors());
app.use(express.json());

// 🔥 public 폴더를 정적 웹 폴더로 지정
app.use(express.static(path.join(__dirname, "public")));

// API 라우터 연결
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

// 서버 시작
app.listen(port, () => {
  console.log(`서버 실행 중: http://localhost:${port}`);
});
