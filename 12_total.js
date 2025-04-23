const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public")); // 실제 이름
app.use("/static", express.static("public")); // "/static" 은 url접근할때 입력, ("public") 은 호출 할 실제 폴더

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // views: c:\pigg4949\Nodejs\views 로 지정

// http://127.0.0.1:3000/
app.get("/", (req, res) => {
  res.send("<h2> 홈페이지입니다. 다양한 기능을 테스트해보세요.");
});

// http://127.0.0.1:3000/user/apple
app.get("/user/:id", (req, res) => {
  res.send(`요청한 사용자 ID는 ${req.params.id}`);
});

//http://127.0.0.1:3000/search?keyword=%EB%AF%B8%EC%84%B8%EB%A8%BC%EC%A7%80&number=23
app.get("/search", (req, res) => {
  const { keyword, number } = req.query;
  res.send(`검색어: ${keyword}, 숫자: ${number}`);
});

app.post("/submit", (req, res) => {
  const { name, age } = req.body;
  res.send(`이름: ${name}, 나이: ${age}`);
});

app.get("/hello", (req, res) => {
  res.render("hello", { name: "김사과" });
});

app.get("/posts", (req, res) => {
  const posts = [
    { title: "첫번째글", content: "내용입니다." },
    { title: "두번째글", content: "express는 정말 편하네요~!!!!" },
  ];
  res.render("posts", { posts });
});

app.listen(port, () => {
  console.log("서버 실행 중");
});
