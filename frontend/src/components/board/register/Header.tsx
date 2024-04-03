import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import usePostStore from "../../../stores/postStore";

import BackButton from "../../common/BackButton";
import { Button } from "../../common/Button";
import { primary } from "../../../assets/styles/palettes";
import { reviewFormStore } from "../../../stores/reviewFormStore";
import { axiosMultipartInstance } from "../../../services/axios";
import { AxiosResponse } from "axios";

interface responseType{
  boardId : number
  uri : string
}

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
  const {reviewForms} = reviewFormStore();
  const {postType, title, content, images, reviews} = usePostStore();
  const {setPostType, setTitle, setContent, setImages, setReviews} = usePostStore();
  const post = {
    data : {
       title,
       content,
       reviews,
       postType
     },
     images
   }

  const onClickBackBtn = () => {
    navigate("/board");
  };

  const onClickSubmitBtn = async () => {
    const formatFormRevies : Review[] = [];
    
    if(!reviewForms || reviewForms.length<=0){
      submitData();
    }

    for(let i=0;i<reviewForms.length;i++){
      if(!fishDatas.has(reviewForms[i].review.name)){
        alert("어종을 정확히 입력해주세요") 
        return;
      }
      else{
        const formatFishId : number | undefined = fishDatas.get(reviewForms[i].review.name);

        const formatReview : Review = {
          fishId : (formatFishId === undefined)? 0 : formatFishId,
          weight : parseFloat(reviewForms[i].review.weight),
          totalPrice : parseFloat(reviewForms[i].review.totalPrice),
          pricePerKg : parseFloat(reviewForms[i].review.pricePerKg)
        }
        
        formatFormRevies.push(formatReview)
      }
    }

    await setReviews(formatFormRevies);
  };

  const submitData = async () => {
    console.log(reviews)
    const formData = new FormData();
    const json = JSON.stringify(post.data);
    const blob = new Blob([json], {type : 'application/json'});

    formData.append('data', blob)

    const imageList : File[] = [];
    images.forEach((image)=>{
      imageList.push(image.file)
    })

    for(let i=0;i<imageList.length;i++){
      formData.append("images", imageList[i]);
    }

    
    await axiosMultipartInstance.post("/api/board", formData)
      .then((res : AxiosResponse) => {
        const board : responseType = res.data.data;

        setReviews([])
        setPostType('normal')
        setContent('')
        setImages([])
        setTitle('')

        navigate(`/board/${board.boardId}`)
      })
      .catch(()=>{
        console.log(post.data.reviews);
        alert("게시물 등록에 실패했습니다.")
      })
  }

  useEffect(()=>{
    if(post.data.reviews.length >0) submitData();
  }, [post.data.reviews])

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
