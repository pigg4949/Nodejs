import express from "express";

const app = express();
app.use(express.urlencoded({ extended: true }));

app.post("/login", (req, res) => {
  const { userid, userpw } = req.body;
  console.log(`아이디: ${userid}`);
  console.log(`비밀번호: ${userpw}`);
  res.send(`아이디: ${userid}, 비밀번호: ${userpw}`);
});

app.listen(3000, () => {
  console.log("서버 실행 중");
});
