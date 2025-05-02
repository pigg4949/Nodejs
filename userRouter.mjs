import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { config } from "./config.mjs";
import { createUser, getUsers } from "./userRepository.mjs";

const router = express.Router();

// 회원가입
router.post("/signup", async (req, res) => {
  const { userid, userpw, name, email } = req.body;
  console.log("[회원가입 시도]", userid, userpw, name, email); // 오류 파악용

  const hashed = await bcrypt.hash(userpw, 10); // 단순 설정
  try {
    const userId = await createUser(userid, hashed, name, email);
    res.status(201).json({ message: "회원가입 성공", id: userId });
  } catch (err) {
    console.error("회원가입 실패", err); // 오류 파악용
    res.status(500).json({ message: "회원가입 실패", error: err.message });
  }
});

// 로그인
router.post("/login", async (req, res) => {
  const { userid, userpw } = req.body;
  try {
    const users = await getUsers();
    const user = users.find((u) => u.userid === userid);
    if (!user) {
      return res.status(401).json({ message: "사용자를 찾을 수 없음" });
    }

    const isValid = await bcrypt.compare(userpw, user.userpw);
    if (!isValid) {
      return res.status(401).json({ message: "비밀번호 불일치" });
    }

    const token = jwt.sign({ userid: user.userid }, config.jwt.secret, {
      expiresIn: config.jwt.expiresInSec,
    });

    res.status(200).json({ token, userid: user.userid });
  } catch (err) {
    res.status(500).json({ message: "로그인 실패", error: err.message });
  }
});

// 사용자 전체 조회 (테스트용)
router.get("/", async (req, res) => {
  const users = await getUsers();
  res.json(users);
});

export default router;
