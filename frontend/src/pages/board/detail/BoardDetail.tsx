import React from "react";
import styled from "styled-components";

import Header from '../../../components/board/detail/Header';
import TopContents from '../../../components/board/detail/TopContents';
import MidContent from '../../../components/board/detail/MidContent';
import BottomContent from '../../../components/board/detail/BottomContent';
import CommentContainer from '../../../components/board/detail/CommentContainer';
import CommentInput from '../../../components/board/detail/CommentInput';
import { Wrapper } from '../../../components/common/Wrapper';


import data from '../../../services/dummy/boardDetail.json';

import data from "../../../services/dummy/boardDetail.json";
import CommentInput from "../../../components/board/detail/CommentInput";

const StyledWrapper = styled(Wrapper)`
  display : flex;
  flex-direction : column;

  padding-bottom : 40px;
`

const Contents = styled.div`
  width : 100%;
  height: auto;

  padding-top : 60px;
`

const Contents = styled.div`
  width: 100%;
  height: auto;

  padding-top: 70px;
`;

export default function BoardDetail() {
  return (
    <StyledWrapper>
      <Header/>
      <Contents>
        <TopContents
          postType={data.postType}
          title={data.title}
          writer={data.writerNickname}
          createdAt={data.createdAt}
        />
        <MidContent content={data.content} thumbnail={data.images} />
        <BottomContent
          likeCount={data.likeCount}
          commentCount={data.comments.length}
        />
        <hr style={{width : '100%'}}></hr>
        <CommentContainer
          comments = {data.comments}
        />
      </Contents>
      <CommentInput/>
    </StyledWrapper>
  )
}
