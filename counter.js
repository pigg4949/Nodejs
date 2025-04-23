let count = 0;

function increase() {
  count++;
}

function getcount() {
  return count;
}

// 모듈 클래스. exports 객체. getCount 를 만든다. 다른 파일에서도 쓸 수 있는 모듈로 등록한다.

module.exports.increase = increase;
module.exports.getcount = getcount;
