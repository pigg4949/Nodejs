let users = [];

//회원 가입(새로운 객체 추가)
export async function createUser(userid, password, name, email) {
  const user = {
    id: Date.now().toString(),
    userid,
    password,
    name,
    email,
    url: "https://randomuser.me/api/portraits/men/29.jpg",
  };
  users = [user, ...users];
  return users;
}

// 로그인 (아이디 패스워드 일치 = 로그인)
export async function login(userid, password) {
  const user = users.find(
    (user) => user.userid === userid && user.password === password
  );
  return user;
}

// 아이디 찾기(중복방지)
export async function findByUserid(userid) {
  return users.find((user) => user.userid === userid);
}

export async function findByid(id) {
  return users.find((user) => user.id === id);
}
