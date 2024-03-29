import React, { useEffect } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Button } from "../common/Button";

import { useNavigate } from "react-router-dom";

import { axiosInstance } from "../../services/axios";
import { AxiosResponse } from "axios";

interface FishData {
  fishId: number;
  imgUri: string;
  fishName: string;
  text: string;
}

const settings = {
  // dots : true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 10000,
  arrows: false,
};

const Wrapper = styled.div`
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;

  margin: 0% 5% 0% 5%;
  width: 90%;

  height: auto;
  display: flex;
  flex-direction: column;
`;

const SlideContent = styled.div`
  position: relative;
`;

const SeasonFish = styled.img`
  margin: 3% 0 0 0;
  width: 100%;
  height: 175px;
  border-radius: 10px;
  object-fit: cover;

  @media only screen and (max-width: 280px) {
    height: 130px;
  }
`;

const OrderButton = styled(Button)`
  position: absolute;
  right: 5%;
  top: 10%;
`;

const FishComment = styled.div`
  font-size: 20px;
  color: white;
  position: absolute;
  right: 5%;
  bottom: 22%;
`;

const FishSubComment = styled(FishComment)`
  font-size: 14px;
  color: white;
  bottom: 10%;
  font-weight: 300;
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0), #212121);
`;

export default function SeasonList() {
  const navigate = useNavigate();
  let order = 0;

  const calcOrder = () => {
    order = order + 1;
    return order;
  };

  const [dataSet, setDataSet] = React.useState<FishData[]>([]);

  useEffect(() => {
    axiosInstance.get("/api/banner/season").then((res: AxiosResponse) => {
      setDataSet(res.data.data);
    });
  }, []);

  return (
    <Wrapper>
      <div>제철 횟감</div>
      <Slider {...settings}>
        {dataSet &&
          dataSet.map((data) => (
            <SlideContent key={data.fishId}>
              <SeasonFish src={data.imgUri}></SeasonFish>
              <GradientOverlay
                onClick={() => {
                  navigate(`info/${data.fishId}`);
                }}
              ></GradientOverlay>
              <OrderButton
                color="#FFFFFF"
                width="auto"
                height="auto"
                fontSize="12px"
                backcolor="rgb(0,0,0,0.5)"
                margin="0"
                border="0px"
                padding="2% 4% 2% 4%"
                cursor="none"
              >
                {calcOrder()} / {dataSet.length}
              </OrderButton>
              <FishComment>{data.fishName}</FishComment>
              <FishSubComment>{data.text}</FishSubComment>
            </SlideContent>
          ))}
      </Slider>
    </Wrapper>
  );
}
