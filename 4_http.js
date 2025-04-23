const http = require("http");

const server = http.createServer((request, response) => {
  const url = request.url;

  // '/' 없이 접속했을 경우.
  if (url === "/") {
    response.writeHead(200, { "Content-Type": "text/plain" }); // 헤더 정보, 브라우저의 준비를 하게 해준다. text/html 등...
    response.end("Hello, World!\n LeeGwangJu Server\n Home!");
  } else if (url === "/about") {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("My Page");
  } else {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("Not Found");
  }
});

// 내부 아이피: 127.0.0.1, 내부 도메인: localhost
server.listen(3000, () => {
  console.log("서버 실행 중");
});
