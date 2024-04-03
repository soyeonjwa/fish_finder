import { axiosInstance } from "../axios";

async function getCommentedPost(latest: string) {
  try {
    const response = await axiosInstance.get(`/api/board/my-comment/${latest}`);
    return response.data;
  } catch (error) {
    throw new Error("댓글단 글 조회 실패");
  }
}

export default getCommentedPost;
