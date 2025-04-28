import jwt from "jsonwebtoken";
import * as authRepository from "../data/HW_auth.mjs";
import { config } from "../HW_config.mjs";

const AUTH_ERROR = { message: "인증에러" };

export const isAuth = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  console.log(authHeader);

  if (!(authHeader && authHeader.startsWith("Bearer"))) {
    console.log("헤더 에러");
    return res.status(401).json(AUTH_ERROR);
  }
  const token = authHeader.split(" ")[1];

  // Bearer asdifjoqwvalsdfmklwqmnlfasdlf 토큰 부분만 가져오겠다는 코드
  console.log(token);

  jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
    if (error) {
      console.log("토큰 에러");
      return res.status(401).json(AUTH_ERROR);
    }
    console.log(decoded.id);
    const user = await authRepository.findByid(decoded.id);
    if (!user) {
      console.log("아이디 없음");
      return res.status(401).json(AUTH_ERROR);
    }
    console.log(`user.id: ${user.id}`);
    console.log(`user.userid: ${user.userid}`);
    req.userid = user.userid;
    next();
  });
};
