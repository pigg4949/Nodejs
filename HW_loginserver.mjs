import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// ES Module에서 __dirname 구현
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS 허용 설정
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// EJS 뷰 엔진 설정
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 루트 경로: 로그인 HTML 제공
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "HW_login.html"));
});

// 로그인 요청 처리: 결과 페이지 렌더링
app.get("/login", (req, res) => {
  const { userid, userpw } = req.query;
  res.render("HW_result", { userid, userpw });
});

// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버 실행 중: ${PORT} 포트`);
});
