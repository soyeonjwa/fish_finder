import { create } from "zustand";
// import postAddPost from "../services/board/postAddPost";

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

  handleSubmit: () => {
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
    // const postId = postAddPost(body);
    console.log(body);
    set(initialState);
    // axios 연결 시 postId를 return;
    return -1;
  },
}));

export default usePostStore;
