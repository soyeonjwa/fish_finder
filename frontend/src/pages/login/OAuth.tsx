import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../services/axios';
import { AxiosResponse } from 'axios';
import { userStore } from '../../stores/userStore';

export default function OAuth() {
    const navigate = useNavigate();
    const queryParam = new URLSearchParams(location.search);
    const {userId, nickname, setUserId , setNickName} = userStore();

    useEffect(() => {
        async ()=>{
            await axiosInstance.get(`/api/users/login?code=${queryParam.get("code")}`)
                .then((res : AxiosResponse) => {
                    console.log(res.data)
                    setUserId(res.data.id)
                    setNickName(res.data.nickname)
                    localStorage.setItem("userId", JSON.stringify(userId))
                    localStorage.setItem("nickname", JSON.stringify(nickname))
                })
                .catch(error => {throw new Error(error.message)})

            navigate("/")
    }},[])

    return (
        <div>로그인/회원가입하는 중</div>
    )
}
