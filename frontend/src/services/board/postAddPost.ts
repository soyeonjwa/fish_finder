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
  const formData = new FormData();
  const json = JSON.stringify(post.data);
  const blob = new Blob([json], {type : 'application/json'});

  formData.append('data', blob)

  for(let i=0;i<post.images.length;i++){
    formData.append("images", post.images[i]);
  }

  try {
    const response = await axiosMultipartInstance.post("/api/board", formData);
    if (response.status !== 200) {
      throw new Error("게시글 작성에 실패했습니다");
    }
    return response.data.boardId;
  } catch (error) {
    console.log(error);
    return -1;
  }
}

export default postAddPost;
