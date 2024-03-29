import React from "react";
import styled from "styled-components";

import usePostStore from "../../../stores/postStore";

import Title from "./Title";
import { Button } from "../../common/Button";
import TagIcon from "../../../assets/icons/tag.svg";
import { gray1, gray3, primary } from "../../../assets/styles/palettes";
import ReviewContainer from "./ReviewContainer";

const Wrapper = styled.div`
  width: 100%;
  height: auto;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: 4%;
  margin-bottom: 4%;
`;

export default function TagContainer() {
  const { postType, setPostType } = usePostStore();

  const handleClickBtn = (type: string) => {
    if (type === postType) return;
    else setPostType(type);
  };

  return (
    <Wrapper>
      <Title icon={TagIcon} name="태그" />
      <ButtonWrapper>
        <Button
          color={postType === "normal" ? "white" : gray3}
          backcolor={postType === "normal" ? primary : gray1}
          width="49%"
          height="33px"
          margin="0 2% 0 0"
          border="0px"
          onClick={() => handleClickBtn("normal")}
        >
          일반
        </Button>
        <Button
          color={postType === "review" ? "white" : gray3}
          backcolor={postType === "review" ? primary : gray1}
          width="49%"
          height="35px"
          margin="0"
          border="0px"
          onClick={() => handleClickBtn("review")}
        >
          리뷰
        </Button>
      </ButtonWrapper>

      {postType === "review" ? <ReviewContainer /> : <></>}
    </Wrapper>
  );
}
