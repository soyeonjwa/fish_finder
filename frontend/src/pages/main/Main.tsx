import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import Header from '../../components/main/Header';
import SeasonList from '../../components/main/SeasonList';
import MarketList from '../../components/main/MarketList';
import PopularPosts from '../../components/main/PopularPosts';
import { NavBarWrapper } from '../../components/common/Wrapper';

import { axiosInstance } from '../../services/axios';
import { AxiosResponse } from 'axios';
import { userStore } from '../../stores/userStore';


const StyledWrapper = styled(NavBarWrapper)`
  width : 100%;
  margin :0;
`

export default function Main() {
    const [code, setCode] = useState<string>("");
    const queryParam = new URLSearchParams(location.search);
    const {userId, nickname, setUserId , setNickName} = userStore();

    useEffect(()=>{
        if(queryParam.get("code")){
            setCode(queryParam.get("code")||"");
            axiosInstance.get(`/api/users/login?code=${code}`)
                .then((res : AxiosResponse)=>{
                    setUserId(res.data.data.id)
                    setNickName(res.data.data.nickname)

                    localStorage.setItem("userId", JSON.stringify(userId))
                    localStorage.setItem("nickname", JSON.stringify(nickname))
                })
        }
    },[])

    return (
        <StyledWrapper>
            <Header/>
            <MarketList/>
            <SeasonList/>
            <PopularPosts/>
        </StyledWrapper>
        
    )
}
