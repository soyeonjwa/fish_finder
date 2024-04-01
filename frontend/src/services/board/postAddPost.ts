import { axiosMultipartInstance } from "../axios";

async function postAddPost(post: {
  data: {
    title: string;
    content: string;
    postType: string;
    reviews: Review[];
  };
  images: File[];
}) {
  console.log(post);
  try {
    const response = await axiosMultipartInstance.post("/api/board", post);
    if (response.status !== 200) {
      throw new Error("게시글 작성에 실패했습니다");
    }
    return response.data.id;
  } catch (error) {
    console.log(error);
    return -1;
  }
}

export default postAddPost;
