import React from "react";
import styled from "styled-components";

import Header from "../../../components/board/detail/Header";
import TopContents from "../../../components/board/detail/TopContents";
import MidContent from "../../../components/board/detail/MidContent";
import { Wrapper } from "../../../components/common/Wrapper";

import data from "../../../services/dummy/boardDetail.json";

const StyledWrapper = styled(Wrapper)`
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;
`;

const Contents = styled.div`
  width: 100%;
  height: auto;
  padding-top: 65px;
`;

export default function BoardDetail2() {
  return (
    <StyledWrapper>
      <Header boardId={data.id} writerId={data.writerId}/>

      <Contents>
        <TopContents
          postType={data.postType}
          title={data.title}
          writer={data.writerNickname}
          createdAt={data.createdAt}
        />
        <MidContent
          reviews={data.reviews}
          content={data.content}
          thumbnail={data.images}
        />
      </Contents>

      {/* <CommentInput
        change={change}
        setChange={setChange}
        boardId={boardId}
        onSubmit={onSubmit}
      /> */}
    </StyledWrapper>
  );
}
