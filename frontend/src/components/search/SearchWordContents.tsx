import React from "react";
import styled from "styled-components";

import { Button } from "../common/Button";
import { gray3 } from "../../assets/styles/palettes";
import { useNavigate } from "react-router-dom";

interface ContentProps {
  title: string;
  fishlist: {id : number, name : string}[];
}

const Wrapper = styled.div`
  width: 100%;
  height: auto;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin: 2% 0 2% 0;
`;

const Line = styled.hr`
  width: 100%;
  margin-bottom: 5%;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 5%;
`;

export default function Contents({ title, fishlist }: ContentProps) {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Line />
      <Title>{title}</Title>

      <ButtonWrapper>
        {fishlist.map((fish) => (
          <Button
            width="30%"
            height="35px"
            margin="2% 0 2% 0"
            color={gray3}
            fontWeight={500}
            border={`1px solid ${gray3}`}
            key={fish.id}
            onClick={() => {navigate(`/info/${fish.id}`)}}
          >
            {fish.name}
          </Button>
        ))}
      </ButtonWrapper>
    </Wrapper>
  );
}
