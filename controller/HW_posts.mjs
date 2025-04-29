import * as postRepository from "../data/HW_posts.mjs";

// 모든 포스트를 가져오는 함수 / 해당 유저아이디에 대한 포스트를 가져오는 함수
export async function getPosts(req, res, next) {
  const userid = req.query.userid;
  const data = await (userid
    ? postRepository.getAllByUserid(userid)
    : postRepository.getAll());
  res.status(200).json(data);
}

// 사용자 아이디(userid)에 대한 포스트를 리턴
export async function getAllByUserid(userid) {
  return posts.filter((post) => post.userid === userid); // filter(): 조건을 만족하는 결과값을 배열로 반환
}
