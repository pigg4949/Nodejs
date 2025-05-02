import express from "express";
import {
  getPostsByUser,
  searchPostsByContent,
  createPost,
  updatePost,
  deletePost,
} from "./postRepository.mjs";
import { verifyToken } from "./authMiddleware.mjs";

const router = express.Router();

// 인증이 필요한 모든 라우트에 미들웨어 적용
router.use(verifyToken);

// 전체 할 일 조회 (토큰으로부터 userid 사용)
router.get("/", async (req, res) => {
  const posts = await getPostsByUser(req.userid);
  res.json(posts);
});

// 키워드 검색
router.get("/search", async (req, res) => {
  const { keyword } = req.query;
  const posts = await searchPostsByContent(req.userid, keyword || "");
  res.json(posts);
});

// 할 일 등록
router.post("/", async (req, res) => {
  const { content, postdate, deadline } = req.body;
  const id = await createPost(req.userid, content, postdate, deadline);
  res.status(201).json({ message: "등록 완료", id });
});

// 할 일 수정
router.put("/:no", async (req, res) => {
  const { no } = req.params;
  const { content, deadline } = req.body;
  const updated = await updatePost(no, req.userid, content, deadline);
  res.json({ message: "수정됨", count: updated });
});

// 할 일 삭제
router.delete("/:no", async (req, res) => {
  const { no } = req.params;
  const deleted = await deletePost(no, req.userid);
  res.json({ message: "삭제됨", count: deleted });
});

export default router;
