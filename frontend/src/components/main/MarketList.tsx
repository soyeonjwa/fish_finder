import React from "react";
import styled from "styled-components";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../assets/styles/sliderdots.css";
import tutorial from "../../assets/images/market/튜토리얼.png";
import marketImage from "../../assets/images/market/노량진수산시장.png";
import compareFish from "../../assets/images/market/광어도다리가자미.png";

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
        marginLeft: "5%",
        marginRight: "5%",
        position: "absolute",
        bottom: "20%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ul> {dots} </ul>
    </div>
  ),
  dotsClass: "dots_custom",
};

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  position: relative;
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
          <ImageContainer src={marketImage} alt="시장"></ImageContainer>
        </div>
        <div>
          <ImageContainer src={compareFish} alt="비교"></ImageContainer>
        </div>
      </Slider>
    </Wrapper>
  );
}
