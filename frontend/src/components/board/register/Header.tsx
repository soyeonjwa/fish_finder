import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import usePostStore from "../../../stores/postStore";

import BackButton from "../../common/BackButton";
import { Button } from "../../common/Button";
import { primary } from "../../../assets/styles/palettes";
import { reviewFormStore } from "../../../stores/reviewFormStore";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  background-color: white;
  z-index: 1000;

  width: 90%;
  height: 60px;

  padding: 0 5% 0 5%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  & > div {
    width: 16%;
    margin: 5% 0 5% 0;

    display: flex;
    justify-content: space-between;
  }
`;

interface HeaderProps{
  fishDatas : Map<string, number>;
}

export default function Header({fishDatas} : HeaderProps) {
  const navigate = useNavigate();
  const { handleSubmit } = usePostStore();
  const {reviewForms, setReviewForms} = reviewFormStore();
  const {reviews, setReviews} = usePostStore();

  const onClickBackBtn = () => {
    navigate("/board");
  };

  const onClickSubmitBtn = () => {
    const formatReviews : Review[] = [];

    for(let i=0;i<reviewForms.length;i++){
      if(!fishDatas.has(reviewForms[i].review.name)){
        alert("어종을 정확히 입력해주세요") 
        return;
      }
      else{
        const formatFishId : number | undefined = fishDatas.get(reviewForms[i].review.name);

        formatReviews.push({
          fishId : (formatFishId === undefined)? 0 : formatFishId,
          weight : parseFloat(reviewForms[i].review.weight),
          totalPrice : parseFloat(reviewForms[i].review.totalPrice),
          pricePerKg : parseFloat(reviewForms[i].review.pricePerKg)
        })
      }
    }
    
    if(formatReviews.length>0){
      setReviews(formatReviews);
      setReviewForms([]);
    }


    console.log(reviews);
    const response = handleSubmit();
    if (response === -1) {
      alert("게시글 등록에 실패하였습니다");
      navigate("/board");
    } else navigate(`/board/${response}`);
  };

  return (
    <Wrapper>
      <BackButton onClickBtn={onClickBackBtn}></BackButton>
      <Button
        color="white"
        width="20%"
        height="auto"
        backcolor={primary}
        margin="4% 0 4% 0"
        border="0px"
        fontWeight="500"
        onClick={onClickSubmitBtn}
      >
        등록
      </Button>
    </Wrapper>
  );
}
