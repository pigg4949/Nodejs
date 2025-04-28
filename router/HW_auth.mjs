import express from "express";
import * as authController from "../controller/HW_auth.mjs";
import { body } from "express-validator";
import { validate } from "../middleware/HW_validator.mjs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// html 파일 연결하기 (static 방식)
// __dirname을 ESM 방식에서 얻는 방법
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// public 디렉토리 경로 잡기
const publicPath = path.join(__dirname, "../public");

// 브라우저에서 http://127.0.0.1:8080/auth/signup 요청 시 HTML 파일을 응답
router.get("/signup", (req, res) => {
  res.sendFile(path.join(publicPath, "HW_signup_250428.html"));
});

const validateLogin = [
  body("userid")
    .trim()
    .isLength({ min: 4 })
    .withMessage("최소 4자 이상 입력")
    .matches(/^[A-Za-z0-9]*$/)
    .withMessage("특수문자는 사용 불가"),

  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("최소 8자 이상 입력")
    .matches(/^/),

  validate,
];

const validateSignup = [
  ...validateLogin,
  body("name").trim().notEmpty().withMessage("name을 입력"),
  body("email").trim().isEmail().withMessage("이메일 형식 확인"),
  validate,
];

// 회원가입
// POST 방식
// http://127.0.0.1:8080/auth/signup
// json 형태로 입력 후 저장
router.post("/signup", validateSignup, authController.signup);

// 로그인
// POST 방식
// http://127.0.0.1:8080/auth/login
// 아이디와 패스워드 입력시 해당 회원정보 출력
router.post("/login", validateLogin, authController.login);

export default router;
