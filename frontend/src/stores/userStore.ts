import {create} from 'zustand';

interface User{
    userId : number;
    nickname : string;
    setUserId : (id: number) => void;
    setNickName : (nickname : string) => void;
}

export const userStore = create<User>(
    (set) => ({
        userId : -1,
        nickname : "",
        setUserId : (userId) => {
            set(()=> ({userId : userId}))
        },
        setNickName : (nickname) => {
            set(() => ({nickname : nickname}))
        }
    })
)