import jwt from "jsonwebtoken";
import { config } from "./config.mjs";

export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "토큰이 없습니다." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    req.userid = decoded.userid; // 토큰에서 사용자 ID를 꺼내서 저장
    next();
  } catch (err) {
    console.error("[JWT 검증 실패]", err.message);
    res.status(403).json({ message: "유효하지 않은 토큰입니다." });
  }
}
