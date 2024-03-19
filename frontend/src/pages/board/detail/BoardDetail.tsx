import React from 'react'
import styled from 'styled-components'

import Header from '../../../components/board/detail/Header';
import TopContents from '../../../components/board/detail/TopContents';
import MidContent from '../../../components/board/detail/MidContent';
import BottomContent from '../../../components/board/detail/BottomContent';
import CommentContainer from '../../../components/board/detail/CommentContainer';

import data from '../../../services/dummy/boardDetail.json';
import CommentInput from '../../../components/board/detail/CommentInput';


const Wrapper = styled.div`
  margin : 0% 5% 0% 5%;
  width : 90%;
  height : auto;

  display : flex;
  flex-direction : column;
`

const Contents = styled.div`
  width : 100%;
  height: auto;

  padding-top : 70px;
`


export default function BoardDetail() {
  return (
    <Wrapper>
      <Header/>
      <Contents>
        <TopContents
          postType = {data.postType}
          title = {data.title}
          writer = {data.writerNickname}
          createdAt= {data.createdAt}
        />
        <MidContent
          content = {data.content}
          thumbnail = {data.images}
        />
        <BottomContent
          likeCount={data.likeCount}
          commentCount={data.comments.length}
        />
      </Contents>
      <hr style={{width : '100%'}}></hr>
      <CommentContainer
        comments = {data.comments}
      />
      <CommentInput/>
    </Wrapper>
  )
}
