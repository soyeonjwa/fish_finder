import React, { useState } from 'react'
import styled from 'styled-components'

import IconButton from '../../common/IconButton'
import HeartIcon from '../../../assets/icons/heart.svg';
import CommentIcon from '../../../assets/icons/comments.svg';
import ScrapIcon from '../../../assets/icons/scrap.svg';
import FillScrapIcon from '../../../assets/icons/scrap_fill.svg'
import FillHeartIcon from '../../../assets/icons/Favorite_fill.svg';
import { userStore } from '../../../stores/userStore';

import { axiosInstance } from '../../../services/axios';
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

export default function BottomContent({boardId, likeCount, commentCount, liked, scraped} : BottomContentProps) {
  const {userId} = userStore();
  const [userLike, setUserLike] = useState<boolean>(liked);
  const [userScraped, setUserScraped] = useState<boolean>(scraped);
  
  const pushLikeBtn = () => {
    if(userId==-1){
      alert("로그인/회원가입 해주세요")
      return;
    }

    axiosInstance.post(`/api/board/like/${boardId}`)
      .then(() => {
        setUserLike(!userLike)
      })
      .catch(error => {throw new Error(error.message)})
  }

  const pushScrapedBtn = () => {
    if(userId==-1) return;

    axiosInstance.post(`/api/board/scrap/${boardId}`)
      .then(()=> {
        setUserScraped(!userScraped)
      })
      .catch(error => {throw new Error(error.message)})
  }

  
  return (
    <Wrapper>
        <LikeComment>
          {
            userLike
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
            {
              userScraped?
              (
                <Scrap>
                  <IconButton
                      width = '100%'
                      margin = '0'
                      icon = {FillScrapIcon}
                      onClick={pushScrapedBtn}
                  />
                </Scrap> 
              )
              :
              (
                <Scrap>
                  <IconButton
                      width = '100%'
                      margin = '0'
                      icon = {ScrapIcon}
                      onClick={pushScrapedBtn}
                  />
                </Scrap> 
              )
            }       

    </Wrapper>
  )
}
