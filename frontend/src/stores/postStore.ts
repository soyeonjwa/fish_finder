import { create } from "zustand";
import postAddPost from "../services/board/postAddPost";

const initialState = {
  postType: "normal",
  title: "",
  content: "",
  reviews: [],
  images: [],
};

const usePostStore = create<PostState & PostAction>()((set, get) => ({
  ...initialState,

  setPostType: (postType: string) => set({ postType }),

  setTitle: (title: string) => set({ title }),

  setContent: (content: string) => set({ content }),

  setReviews: (reviews: Review[]) => set({ reviews }),

  setImages: (images: ImageFile[]) => set({ images }),

  handleSubmit: ()=> {
    console.log(
      get().postType,
      get().title,
      get().content,
      get().reviews,
      get().images
    );

    const imageList: File[] = [];
    get().images.forEach((image) => {
      imageList.push(image.file);
    });

    const body = {
      data: {
        title: get().title,
        content: get().content,
        postType: get().postType,
        reviews: get().reviews,
      },
      images: imageList,
    };
    const boardId : number= postAddPost(body);
    console.log("postStore"+ boardId);
    set(initialState);

    return boardId;
  },
}));

export default usePostStore;
