import express from "express";

const router = express.Router();

router.use((req, res, next) => {
  console.log("posts에 존재하는 미들웨어");
  next();
});

// http://127.0.0.1:3000/users 로 호출 가능
router.get("/", (req, res) => {
  res.status(200).send("GET: /posts 전체 글 조회");
});

router.post("/", (req, res) => {
  res.status(201).send("POST: /posts 글 쓰기");
});

router.put("/:id", (req, res) => {
  res.status(201).send("PUT: /posts/:id 글 수정");
});

router.delete("/:id", (req, res) => {
  res.status(201).send("DELETE: /posts/:id 글 삭제");
});

export default router;
