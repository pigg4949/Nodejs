import jwt from "jsonwebtoken";

const secretKey = "!@#$%^&*()"; // 서버 비밀키 (절대 공개 X)

// 1. 토큰 생성
const token = jwt.sign(
  { userid: "apple", role: "admin" }, // payload (토큰에 담을 데이터)
  secretKey, // 비밀키
  { expiresIn: "1h" } // 옵션: 1시간 뒤 만료
);

console.log("생성된 토큰:", token);

// 2. 토큰 검증
try {
  const decoded = jwt.verify(token, secretKey);
  console.log("검증된 토큰 내용:", decoded);
} catch (error) {
  console.error("토큰 검증 실패:", error.message);
}
