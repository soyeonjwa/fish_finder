import { AxiosResponse } from "axios";
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

  axiosMultipartInstance.post("/api/board", formData)
    .then((res : AxiosResponse) => {
      if(res.status !== 200) return -1;
      return res.data.data.boardId;
    })
    .catch(() => {throw new Error("게시글 작성에 실패했습니다")})
}

export default postAddPost;
