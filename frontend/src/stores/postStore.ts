import { create } from "zustand";
import { persist } from "zustand/middleware";
// import postAddPost from "../services/board/postAddPost";

const initialState = {
  postType: "normal",
  title: "",
  content: "",
  reviews: [],
  images: [],
};

const usePostStore = create<PostState & PostAction>()(
  persist(
    (set, get) => ({
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
        const body = {
          data: {
            title: get().title,
            content: get().content,
            postType: get().postType,
            reviews: get().reviews,
          },
          images: get().images,
        };
        // postAddPost(body);
        console.log(body);
      },
    }),
    { name: "post-storage" }
  )
);

export default usePostStore;
