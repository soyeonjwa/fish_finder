import React from "react";
import styled from "styled-components";

import usePostStore from "../../../stores/postStore";

import Title from "./Title";
import TitleIcon from "../../../assets/icons/title.svg";

const Wrapper = styled.div`
  width: 100%;
  height: auto;
`;

const Input = styled.input`
  font-size: 15px;
  font-family: Pretendard;
  width: 94%;
  margin: 3% 0% 4% 0%;
  border: 0px;
`;

export default function TitleContainer() {
  const { title, setTitle } = usePostStore();

  return (
    <Wrapper>
      <Title icon={TitleIcon} name="제목" />
      <Input
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력해주세요."
      />
    </Wrapper>
  );
}
