import { axiosInstance } from "../axios";

async function getRecord() {
  try {
    const response = await axiosInstance.get("/api/board/my-record");
    return response.data;
  } catch (error) {
    throw new Error("사용내역 조회 실패");
  }
}

export default getRecord;
