import React from 'react'
import styled from 'styled-components'

import IconButton from '../../common/IconButton'
import HeartIcon from '../../../assets/icons/heart.svg';
import CommentIcon from '../../../assets/icons/comments.svg';
import ScrapIcon from '../../../assets/icons/scrap.svg';
import FillHeartIcon from '../../../assets/icons/Favorite_fill.svg';
import { axiosInstance } from '../../../services/axios';
import { AxiosResponse } from 'axios';
import { userStore } from '../../../stores/userStore';

interface BottomContentProps{
    boardId : number
    likeCount : number
    commentCount : number
    liked : boolean
    scraped : boolean
}

const Wrapper = styled.div`
  width : 100%;
  height : auto;
  display : flex;
  flex-direction: row;
  justify-content: space-between;
`

const LikeComment = styled.div`
  width : 70%;
  display : flex;
  flex-direction: row;

  & > div{
    font-size : 20px;
    margin-left : 1%;
    margin-right : 5%;
  }
`

const Scrap = styled.div`
  width : 10%;
`


export default function BottomContent({boardId, likeCount, commentCount, liked} : BottomContentProps) {
  const {userId} = userStore();
  
  const pushLikeBtn = () => {
    if(userId==-1){
      alert("로그인/회원가입 해주세요")
      return;
    }

    axiosInstance.post(`/api/board/like/${boardId}`,
      {
        headers : {
          memberId : userId
        },
      }
    )
      .then((res : AxiosResponse) => {
        console.log(res.data.message)
      })
      .catch(error => {throw new Error(error.message)})
  }
  
  return (
    <Wrapper>
        <LikeComment>
          {
            liked
            ?(
              <IconButton
                width = '12%'
                margin = '0'
                icon = {FillHeartIcon}   
                onClick = {pushLikeBtn} 
              />
            )
            :(
              <IconButton
                width = '10%'
                margin = '0'
                icon = {HeartIcon}
                onClick={pushLikeBtn}
              />
            )
          }
              <div>{likeCount}</div>
              <IconButton
                width = '10%'
                margin = '0'
                icon = {CommentIcon}
              />
              <div>{commentCount}</div>
            </LikeComment>
            <Scrap>
              <IconButton
                  width = '100%'
                  margin = '0'
                  icon = {ScrapIcon}
              />
            </Scrap>        

    </Wrapper>
  )
}
