import React from "react";
import styled from "styled-components";

import { gray3, gray5, black } from "../../assets/styles/palettes";
import { Link } from "react-router-dom";
import RightArrow from '../../assets/icons/rightArrow.svg'


interface FishInfoCardProps {
  id : number,
  name: string;
  description: string;
  otherPrice: number;
  ourPrice: number;
  imgUri: string;
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

const ImageWrapper = styled.div`
  width: 100%;
  height : 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
`

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

const StyledLink = styled(Link)`
  color : ${black};
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  
  & > img{
    width : 7%;
    margin-left : 5%;
  }
`
export default function FishInfoCard({
  id,
  name,
  description,
  otherPrice,
  ourPrice,
  imgUri
}: FishInfoCardProps) {
  return (
    <Wrapper>
      <ImageWrapper>
        <Image src={imgUri} />
      </ImageWrapper>
      
      <p>{name}</p>
      <span>{description}</span>
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
            <Td> {otherPrice}원~</Td>
            <Td> <StyledLink to = {`/marketCondition/${id}`}>{ourPrice}원~
              <img src = {RightArrow}></img>
            </StyledLink></Td>
          </tr>
        </tbody>
      </Table>
    </Wrapper>
  );
}
