import React from "react";
import styled from "styled-components";

import Info from "../../assets/icons/info.svg";
import { gray3 } from "../../assets/styles/palettes";

interface FishCompareCardProps {
  fishId: number;
  name: string;
  imgUri: string;
  infoIcon?: boolean;
  onClickCard: (id: number) => void;
}

const Wrapper = styled.div`
  width: 90%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 1px solid ${gray3};
  border-radius: 10px;
  padding: 5%;

  & > p {
    font-size: 18px;
    font-weight: bold;
  }

  & > span {
  }
`;
const InfoIcon = styled.img`
  position: absolute;
  top: 5%;
  right: 5%;
  width: 20px;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 100%;
  height: 90%;
  object-fit: contain;
  margin-top: 10px;
  margin-bottom: 15px;
`;

export default function FishCompareCard({
  fishId,
  name,
  imgUri,
  onClickCard,
  infoIcon,
}: FishCompareCardProps) {
  return (
    <Wrapper onClick={() => onClickCard(fishId)}>
      {infoIcon ?? <InfoIcon src={Info} alt="정보" />}
      <ImageWrapper>
        <Image src={imgUri} alt={name} />
      </ImageWrapper>

      <span>{name}</span>
    </Wrapper>
  );
}
