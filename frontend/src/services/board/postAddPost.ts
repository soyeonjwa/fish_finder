import { AxiosResponse } from "axios";
import { axiosMultipartInstance } from "../axios";

interface responseType{
  boardId : number
  uri : string
}

function postAddPost(post: {
  data: {
    title: string;
    content: string;
    postType: string;
    reviews: Review[];
  };
  images: File[];
}) : number {
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
      const board : responseType = res.data.data;
      return board.boardId;
    })
    .catch(() => {return -1})

  return -1;
}

export default postAddPost;
