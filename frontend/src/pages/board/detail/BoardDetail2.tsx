import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router";

import Header from "../../../components/board/detail/Header";
import TopContents from "../../../components/board/detail/TopContents";
import MidContent from "../../../components/board/detail/MidContent";
import CommentInput from "../../../components/board/detail/CommentInput";
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

export default function BoardDetail() {
  const { boardId } = useParams();
  const [change, setChange] = useState<boolean>(false);

  return (
    <StyledWrapper>
      <Header />

      <Contents>
        <TopContents
          postType={data.postType}
          title={data.title}
          writer={data.writerNickname}
          createdAt={data.createdAt}
        />
        <MidContent
          content={data.content}
          thumbnail={data.images}
          reviews={data.reviews}
        />
        <hr style={{ width: "100%" }}></hr>
      </Contents>

      <CommentInput change={change} setChange={setChange} boardId={boardId} />
    </StyledWrapper>
  );
}
