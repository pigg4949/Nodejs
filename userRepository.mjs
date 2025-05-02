import { db } from "./db.mjs";

export async function getUsers() {
  // db.query("select * from member")의 반환은 [rows, fields]
  const [rows] = await db.query("select * from user");
  return rows;
}

// createUser
export async function createUser(userid, userpw, name, email) {
  const [result] = await db.query(
    "insert into user (userid, userpw, name, email) values (?,?,?,?)",
    [userid, userpw, name, email]
  );
  return result.insertId;
}

// deleteUser
export async function deleteUser(idx) {
  const [result] = await db.query("delete from member where idx=?", [idx]);
  return result.affectedRows; // 몇 개의 행이 삭제됐는지 전달.
}

// update
export async function updateUserEmail(idx, newEmail) {
  const [result] = await db.query("update member set email=? where idx=?", [
    newEmail,
    idx,
  ]);
  return result.affectedRows; // 몇 개의 행이 수정됐는지 전달.
}
