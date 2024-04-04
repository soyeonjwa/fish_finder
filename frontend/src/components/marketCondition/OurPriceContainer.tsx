import React from "react";
import styled from "styled-components";

import { gray2, gray3, primary } from "../../assets/styles/palettes";

interface OurPriceContainerProps {
  ourWeeklyPrice: PriceData[];
}

export interface PriceData {
  date: string;
  price: number;
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
  margin: 3% 0 3% 0;
`;

export default function OurPriceContainer({
  ourWeeklyPrice,
}: OurPriceContainerProps) {
  return (
    <Wrapper>
      <Title>
        <div>유저 거래 내역</div>
        <span>1kg당</span>
      </Title>
      <div>
        {ourWeeklyPrice &&
          ourWeeklyPrice
            .slice(0)
            .reverse()
            .map((data) => (
              <Content key={data.date}>
                <div>{data.date}</div>
                <div>{data.price.toLocaleString()}원</div>
              </Content>
            ))}
      </div>
    </Wrapper>
  );
}
