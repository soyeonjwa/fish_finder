import React from "react";
import styled from "styled-components";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import tutorial from "../../assets/images/market/튜토리얼.png";
import marketImage1 from "../../assets/images/market/노량진수산시장.png";

import { Link } from "react-router-dom";

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


const ImageContainer = styled.img`
  margin: 0% 0 5% 0;
  width: 100%;
  object-fit: contain;
`;

export default function MarketList() {

  return (
    <Wrapper>
      <Slider {...settings}>
        <div>
          <Link to="/tutorial">
            <ImageContainer src={tutorial} alt="튜토리얼"></ImageContainer>
          </Link>
        </div>
        <div>
          <ImageContainer src={marketImage1} alt="시장1"></ImageContainer>
        </div>
      </Slider>
    </Wrapper>
  );
}
