const fs = require("fs");

/*
// 동기 방식의 경우 별도로 예외(오류)처리를 해줘야 함
const data = fs.readFileSync("example.txt", "utf8"); // readFile (비동기) 방식, readFileSync 동기 방식
console.log(`파일 내용 ${data}`);
*/

fs.readFile("example.txt", "utf-8", (error, data) => {
  if (error) {
    console.log(`파일 읽기 실패: ${error}`);
    return;
  }
  console.log(`파일 내용: ${data}`);
});
console.log(`프로그램을 종료합니다.`);
