const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: 회원가입
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userid:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               phoneNum:
 *                 type: string
 *     responses:
 *       200:
 *         description: 회원가입 페이지 생성 완료
 * /login:
 *   post:
 *     summary: 로그인
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userid:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: 로그인 페이지 생성 완료
 * /user:
 *   put:
 *     summary: 회원정보 수정
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userid:
 *                 type: string
 *               newEmail:
 *                 type: string
 *               newName:
 *                 type: string
 *               newPhoneNum:
 *                 type: string
 *     responses:
 *       201:
 *         description: 회원정보 수정페이지 생성 완료
 *   delete:
 *     summary: 회원탈퇴
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userid:
 *                 type: string
 *     responses:
 *       200:
 *         description: 회원탈퇴 생성 완료
 */
router.post("/signup", (req, res) => {
  res.send("회원가입 페이지");
});

router.post("/login", (req, res) => {
  res.status(201).send("로그인 페이지");
});

router.put("/user", (req, res) => {
  res.status(201).send("회원정보 수정 페이지");
});

router.delete("/user", (req, res) => {
  res.status(201).send("회원탈퇴 페이지");
});

module.exports = router;
