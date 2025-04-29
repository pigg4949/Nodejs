import express from "express";
import * as postController from "../controller/HW_posts.mjs";
import { body } from "express-validator";
import { validate } from "../middleware/HW_validator.mjs";
import { isAuth } from "../middleware/HW_auth.mjs";

const router = express.Router();

// 모든 포스트 가져오기

// 해당 id에 대한 포스트 가져오기
// GET 방식
// http://127.0.0.1:8080/posts/
router.get("/", isAuth, postController.getPosts);

export default router;
