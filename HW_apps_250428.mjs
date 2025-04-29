import express from "express";
import authRouter from "./router/HW_auth.mjs";
import postsRouter from "./router/HW_posts.mjs";
import { config } from "./HW_config.mjs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// CORS 허용 설정
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// ESM 환경에서는 __dirname 대신 이렇게 세팅
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 정적 파일 서빙 (public 폴더)
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use("/auth", authRouter);
app.use("/posts", postsRouter);

// 없는 라우터 처리
app.use((req, res, next) => {
  res.sendStatus(404);
});

const PORT = process.env.PORT || config.host.port;
app.listen(PORT, () => {
  console.log(`서버 실행 중: ${PORT} 포트`);
});
