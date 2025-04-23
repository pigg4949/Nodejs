const path = require("path");

console.log(__dirname); // 현재 디렉토리
console.log(__filename); // 현재 작업중인 파일명
console.log(path.sep); // 현재 디렉토리를 나누는 특수문자
console.log(path.delimiter); // 한 문장이 끝날 때 마다 사용하는 문자

console.log(path.basename(__filename)); // 파일 이름 추출
console.log(path.basename(__filename, ".js")); // 파일 이름(확장자 제외) 추출
console.log(path.dirname(__filename)); // 디렉토리 만 추출
console.log(path.extname(__filename)); // 확장자명 만 추출
