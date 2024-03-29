import { axiosInstance } from "../axios";

async function postAddPost(post: {
  data: {
    title: string;
    content: string;
    postType: string;
    reviews: Review[];
  };
  images: ImageFile[];
}) {
  console.log(post);
  try {
    const response = await axiosInstance.post("/api/board", post);
    if (response.status !== 201) {
      throw new Error("게시글 작성에 실패했습니다");
    }
  } catch (error) {
    console.log(error);
  }
}

export default postAddPost;
