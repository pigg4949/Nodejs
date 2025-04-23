// 서버 동작 파일
const http = require("http");
const fs = require("fs");
const ejs = require("ejs");
const path = require("path");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    const filePath = path.join(__dirname, "views", "index.ejs"); // path.join 으로 템플릿파일경로 생성
    ejs.renderFile(filePath, { name: "김사과" }, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("서버 오류");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else if (req.url === "/users") {
    const filePath = path.join(__dirname, "views", "users.ejs");
    const users = ["김사과", "반하나", "이메론"];
    ejs.renderFile(filePath, { users }, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("렌더링 오류");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
      return;
    });
  } else if (req.url === "/posts") {
    const filePath = path.join(__dirname, "views", "posts.ejs");
    const posts = [
      { title: "첫 글", content: "안녕하세요!" },
      { title: "둘째 글", content: "Node.js 재미있어요!!" },
    ];
    ejs.renderFile(filePath, { posts }, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("렌더링 오류");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
      return;
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("페이지를 찾을 수 없습니다.");
  }
});

server.listen(3000, () => {
  console.log("서버 실행 중");
});
