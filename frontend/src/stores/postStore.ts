import { create } from "zustand";

const initialState = {
  postType: "normal",
  title: "",
  content: "",
  reviews: [],
  images: [],
};

const usePostStore = create<PostState & PostAction>()((set) => ({
  ...initialState,

  setPostType: (postType: string) => set({ postType }),

  setTitle: (title: string) => set({ title }),

  setContent: (content: string) => set({ content }),

  setReviews: (reviews: Review[]) => set({ reviews }),

  setImages: (images: ImageFile[]) => set({ images })
}));

export default usePostStore;
