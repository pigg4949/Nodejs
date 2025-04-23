const http = require("http");

const skills = [
  { name: "HTML" },
  { name: "CSS" },
  { name: "JavaScript" },
  { name: "Java" },
  { name: "Python" },
  { name: "AI" },
  { name: "Node.js" },
  { name: "MuSQL" },
  { name: "mongoDB" },
];

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //외내부 접속 허용, 다른 포트에서 접속하는 것을 허용하는 방식
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); // 메서드 표현 방식 허용
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // 헤더 타입 허용

  const url = req.url;
  const method = req.method;
  if (method == "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(skills));
  }
});

server.listen(3000, () => {
  console.log("서버 실행 중");
});
