import { axiosInstance } from "../axios";

async function getScrapedPost(latest: string) {
  try {
    const response = await axiosInstance.get(`/api/board/my-scrap/${latest}`);
    return response.data;
  } catch (error) {
    throw new Error("스크랩한 게시글 조회 실패");
  }
}

export default getScrapedPost;
