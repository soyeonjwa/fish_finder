import React from "react";
import styled from "styled-components";

import Fish from "../../assets/images/fishcard/잿방어.png";
import { gray3, gray5 } from "../../assets/styles/palettes";

interface FishInfoCardProps {
  name: string;
  information: string;
  price1: number;
  price2: number;
  similarFish?: string[];
  //   imageURL?: string;
}

const Wrapper = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  margin-bottom: 10px;
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  border-bottom: 1px solid ${gray3};
  color: ${gray5};
  padding: 8px;
  text-align: center;
`;

const Td = styled.td`
  color: ${gray5};
  padding: 8px;
  text-align: center;
`;
export default function FishInfoCard({
  name,
  information,
  price1,
  price2,
}: FishInfoCardProps) {
  return (
    <Wrapper>
      <Image src={Fish} />
      <p>{name}</p>
      <span>{information}</span>
      <Table>
        <thead>
          <tr>
            <Th></Th>
            <Th>타사이트</Th>
            <Th>
              물어바종
              <br />
              평균거래가
            </Th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Td>1kg 당</Td>
            <Td> {price1}원~</Td>
            <Td> {price2}원~</Td>
          </tr>
        </tbody>
      </Table>
    </Wrapper>
  );
}
