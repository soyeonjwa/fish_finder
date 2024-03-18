import React from 'react'
import styled from 'styled-components'

import IconButton from '../../common/IconButton'
import HeartIcon from '../../../assets/icons/heart.svg';
import CommentIcon from '../../../assets/icons/comments.svg';
import ScrapIcon from '../../../assets/icons/scrap.svg';

interface BottomContentProps{
    likeCount : number;
    commentCount : number
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


export default function BottomContent({likeCount, commentCount} : BottomContentProps) {
  return (
    <Wrapper>
        <LikeComment>
              <IconButton
                width = '10%'
                margin = '0'
                icon = {HeartIcon}
              />
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
