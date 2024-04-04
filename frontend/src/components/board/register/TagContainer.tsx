import React from "react";
import styled from "styled-components";

import usePostStore from "../../../stores/postStore";

import Title from "./Title";
import { Button } from "../../common/Button";
import TagIcon from "../../../assets/icons/tag.svg";
import { gray1, gray3, primary } from "../../../assets/styles/palettes";
import ReviewContainer from "./ReviewContainer";
import { reviewFormStore } from "../../../stores/reviewFormStore";

const Wrapper = styled.div`
  width: 100%;
  height: auto;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: 4%;
  margin-bottom: 4%;
`;

interface TagContainerProps{
  fishDatas : Map<string, number>
}

export default function TagContainer({fishDatas} : TagContainerProps) {
  const { postType, setPostType } = usePostStore();
  const { setReviewForms } = reviewFormStore();

  const initialFormData : ReviewFormType = {
    id : 1,
    review : {
      name : "",
      pricePerKg : "",
      totalPrice : "",
      weight : ""
    }
  }

  const handleClickBtn = (type: string) => {
    if(type==="normal"){
      setReviewForms([]);
      setPostType("normal")
    }
    else{
      setReviewForms([initialFormData])
      setPostType("review")
    }
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

      {postType === "review" ? <ReviewContainer fishDatas = {fishDatas}/>: <></>}
    </Wrapper>
  );
}
