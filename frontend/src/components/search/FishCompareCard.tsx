import React from "react";
import styled from "styled-components";

import Fish from "../../assets/images/fishcard/잿방어.png";
import Info from "../../assets/icons/info.svg";
import { gray3 } from "../../assets/styles/palettes";
interface FishCompareCardProps {
  name: string;
}

const Wrapper = styled.div`
  width: 38%;
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
export default function FishCompareCard({ name }: FishCompareCardProps) {
  return (
    <Wrapper>
      <InfoIcon src={Info} />
      <Image src={Fish} />
      <span>{name}</span>
    </Wrapper>
  );
}
