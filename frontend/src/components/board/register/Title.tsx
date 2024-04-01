import React from "react";
import styled from "styled-components";

interface TitleProps {
  icon: string;
  name: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const IconImage = styled.img`
  width: 6%;
  margin-right: 2%;
`;

const Name = styled.div`
  font-size: 17px;
`;

export default function Title({ icon, name }: TitleProps) {
  return (
    <Wrapper>
      <IconImage src={icon} alt="아이콘 이미지" />
      <Name>{name}</Name>
    </Wrapper>
  );
}
