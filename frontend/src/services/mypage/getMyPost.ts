import { axiosInstance } from "../axios";

async function getMyPost(latest: string) {
  try {
    const response = await axiosInstance.get(`/api/board/my-post/${latest}`);
    return response.data;
  } catch (error) {
    throw new Error("작성 게시글 조회에 실패했습니다");
  }
}

export default getMyPost;
