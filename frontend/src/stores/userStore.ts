import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  userId: number;
  nickname: string;
  setUserId: (id: number) => void;
  setNickName: (nickname: string) => void;
}

export const userStore = create<User>()(
  persist(
    (set): User => ({
      userId: -1,
      nickname: "",
      setUserId: (userId: number) => {
        set(() => ({ userId: userId }));
      },
      setNickName: (nickname: string) => {
        set(() => ({ nickname: nickname }));
      },
    }),
    {
      name: "user-storage",
    }
  )
);
