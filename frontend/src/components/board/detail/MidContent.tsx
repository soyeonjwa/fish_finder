import React, { useState } from "react";
import styled from "styled-components";
import ImageContainer from "../../common/ImageContainer";
import Slider from "react-slick";
// import Modal from "react-modal";

import { Modal } from "../../common/Modal";
import { Overlay } from "../../common/Overlay";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../assets/styles/sliderdots.css";
import ReviewTable from "./ReviewTable";

interface MidContentProps {
  content: string;
  thumbnail: image[];
  reviews: review[];
}

interface image {
  imageId: number;
  imageUri: string;
}

interface review {
  reviewId: number;
  fishId: number;
  fishName: string;
  weight: number;
  pricePerKg: number;
  totalPrice: number;
}

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  margin-bottom: 6%;
`;

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  arrows: false,
  appendDots: (dots: boolean) => (
    <div
      style={{
        width: "90%",
        marginLeft: "5%",
        marginRight: "5%",
        position: "absolute",
        bottom: "10%",
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

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
  border-radius: 10px;
`;

export default function MidContent({
  content,
  thumbnail,
  reviews,
}: MidContentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  return (
    <Wrapper>
      <div style={{ fontSize: "16px", marginBottom: "2%" }}>
        {content.split("\n").map((line, index) => {
          return (
            <span key={index}>
              {line}
              <br />
            </span>
          );
        })}
      </div>
      {reviews && reviews.length > 0 && (
        <ReviewTable reviews={reviews}></ReviewTable>
      )}
      <Slider {...settings}>
        {thumbnail &&
          thumbnail.map((image, index) => (
            <div key={index}>
              <ImageContainer
                src={image.imageUri}
                alt="썸네일"
                width="100%"
                height="300px"
                objectFit="cover"
                onClick={() => {
                  setIsOpen(true);
                  setModalImage(image.imageUri);
                }}
              ></ImageContainer>
            </div>
          ))}
      </Slider>
      {isOpen && (
        <>
          <Modal
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <ImageWrapper>
              <Image src={modalImage} alt="모달이미지"></Image>
            </ImageWrapper>
            {/* <ImageContainer
              src={modalImage}
              alt="모달이미지"
              width="100%"
              height="100%"
              objectFit="contain"
            ></ImageContainer> */}
          </Modal>
          <Overlay
            onClick={() => {
              setIsOpen(false);
            }}
          />
        </>
      )}
    </Wrapper>
  );
}
