import React from "react";
import styled from "styled-components";

import Info from "../../assets/icons/info.svg";
import { gray3 } from "../../assets/styles/palettes";

interface FishCompareCardProps {
  fishId : number,
  name : string,
  imgUri : string,
  onClickCard :(id:number) => void;
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

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  margin-top: 10px;
  margin-bottom: 15px;
`;

export default function FishCompareCard({ fishId, name, imgUri, onClickCard }: FishCompareCardProps) {
  return (
    <Wrapper onClick={()=>onClickCard(fishId)}>
      <InfoIcon src={Info} />
      <Image src={imgUri} />
      <span>{name}</span>
    </Wrapper>
  );
}
