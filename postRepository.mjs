import { db } from "./db.mjs";

// 특정 사용자의 전체 할 일 조회
export async function getPostsByUser(userid) {
  const [rows] = await db.query("SELECT * FROM post WHERE userid = ?", [
    userid,
  ]);
  return rows;
}

// 특정 키워드를 포함하는 할 일 검색 (사용자 제한 포함)
export async function searchPostsByContent(userid, keyword) {
  const likeKeyword = `%${keyword}%`; // 부분 검색용 패턴
  const [rows] = await db.query(
    "SELECT * FROM post WHERE userid = ? AND content LIKE ?",
    [userid, likeKeyword]
  );
  return rows;
}

// 할 일 추가
export async function createPost(userid, content, postdate, deadline) {
  const [result] = await db.query(
    "INSERT INTO post (userid, content, postdate, deadline) VALUES (?, ?, ?, ?)",
    [userid, content, postdate, deadline]
  );
  return result.insertId;
}

// 할 일 수정 (자신의 글만)
export async function updatePost(no, userid, content, deadline) {
  const [result] = await db.query(
    "UPDATE post SET content = ?, deadline = ? WHERE no = ? AND userid = ?",
    [content, deadline, no, userid]
  );
  return result.affectedRows;
}

// 할 일 삭제 (자신의 글만)
export async function deletePost(no, userid) {
  const [result] = await db.query(
    "DELETE FROM post WHERE no = ? AND userid = ?",
    [no, userid]
  );
  return result.affectedRows;
}
