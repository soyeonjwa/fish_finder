import React from "react";
import styled from "styled-components";

import { gray2, gray3, primary } from "../../assets/styles/palettes";

interface OtherPriceContainerProps {
  name: string;
  otherPrice: number;
}

const Wrapper = styled.div`
  margin-top: 6%;
  width: 86%;
  height: auto;
  border: 1px solid ${gray3};
  border-radius: 10px;
  padding: 7%;
`;

const Title = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 5%;

  & > div {
    font-size: 18px;
    color: ${primary};
    font-weight: 600;
  }

  & > span {
    color: ${gray2};
  }
`;

const Content = styled.div`
  font-size: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default function OtherPriceContainer({
  name,
  otherPrice,
}: OtherPriceContainerProps) {
  return (
    <Wrapper>
      <Title>
        <div>{name}</div>
        <span>1kg당</span>
      </Title>
      <Content>
        <div>단일 사이즈</div>
        <span>{otherPrice.toLocaleString()}원~</span>
      </Content>
    </Wrapper>
  );
}
