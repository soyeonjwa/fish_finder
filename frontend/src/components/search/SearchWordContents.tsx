import React from "react";
import styled from "styled-components";

import { Button } from "../common/Button";
import { gray3 } from "../../assets/styles/palettes";
import { useNavigate } from "react-router-dom";

interface ContentProps {
  title: string;
  fishlist: {fishId : number, name : string}[];
}

interface Fish{
  fishId : number
  name : string
}

const Wrapper = styled.div`
  width: 100%;
  height: 200px;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin: 2% 0 3% 0;
`;

const Line = styled.hr`
  width: 100%;
  margin-bottom: 5%;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns:repeat(3, 1fr);
  margin-bottom: 5%;
  row-gap : 5%;
  column-gap: 3%;
`;

export default function Contents({ title, fishlist }: ContentProps) {
  const navigate = useNavigate();

  const onClickBtn = (fish : Fish) => {
    const recentSearch : Fish[]  = JSON.parse(localStorage.getItem("RecentSearch")||'[]').filter((e:Fish) => e.fishId != fish.fishId)
    
    if(recentSearch.length>=6) recentSearch.splice(0,1);

    recentSearch.push({fishId : fish.fishId, name : fish.name})
    localStorage.setItem("RecentSearch", JSON.stringify(recentSearch))

    navigate(`/info/${fish.fishId}`);
  }

  return (
    <Wrapper>
      <Line />
      <Title>{title}</Title>

      <ButtonWrapper>
        {fishlist.map((fish) => (
          <Button
            width="100%"
            height="35px"
            margin="2% 0 2% 0"
            color={gray3}
            fontWeight={500}
            border={`1px solid ${gray3}`}
            key={fish.fishId}
            onClick={() => onClickBtn({fishId : fish.fishId, name : fish.name})}
          >
            {fish.name}
          </Button>
        ))}
      </ButtonWrapper>
    </Wrapper>
  );
}
