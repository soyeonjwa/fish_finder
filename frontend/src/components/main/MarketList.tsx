import React from "react";
import styled from "styled-components";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import marketImage1 from "../../assets/images/market/노량진1.jpg";
import marketImage2 from "../../assets/images/market/노량진2.jpg";
import marketImage3 from "../../assets/images/market/노량진3.jpg";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../stores/userStore";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 15000,
  arrows: false,
  appendDots: (dots: boolean) => (
    <div
      style={{
        width: "90%",
        position: "absolute",
        bottom: "5%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ul> {dots} </ul>
    </div>
  ),
};

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;

  font-family: Pretendard;
`;

const UpContents = styled.div`
  margin: 3% 5% 0% 5%;
  width: 90%;
  font-size: 15px;

  & > span {
    margin-right: 3%;
    font-weight: 600;
    font-size: 20px;
  }
`;

const ImageContainer = styled.img`
  margin: 3% 0 5% 0;
  width: 100%;
  height: 175px;
  object-fit: cover;
`;

export default function MarketList() {
  const { nickname } = userStore();
  const navigate = useNavigate();

  return (
    <Wrapper>
      <UpContents>
        {nickname !== "" ? (
          <span
            onClick={() => {
              navigate("/mypage");
            }}
          >
            {nickname}님
          </span>
        ) : (
          <span>안녕하세요</span>
        )}
        주변 수산물 시장
      </UpContents>
      <Slider {...settings}>
        <div>
          <ImageContainer src={marketImage1} alt="시장1"></ImageContainer>
        </div>
        <div>
          <ImageContainer src={marketImage2} alt="시장2"></ImageContainer>
        </div>
        <div>
          <ImageContainer src={marketImage3} alt="시장3"></ImageContainer>
        </div>
      </Slider>
    </Wrapper>
  );
}
