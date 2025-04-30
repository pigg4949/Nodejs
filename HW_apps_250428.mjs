import express from "express";
import authRouter from "./router/HW_auth.mjs";
import postsRouter from "./router/HW_posts.mjs";
import { config } from "./HW_config.mjs";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const app = express();

// ESM 환경에서는 __dirname 대신 이렇게 세팅
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS 허용 설정
app.use(cors());

// 정적 파일 서빙 (public 폴더)
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use("/auth", authRouter);
app.use("/posts", postsRouter);

// 없는 라우터 처리
app.use((req, res, next) => {
  res.sendStatus(404).json("없는 라우터로부터의 접근입니다.");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "HW_signup_250428.html"));
});

const PORT = process.env.PORT || config.env.HOST_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
