import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import BackButton from "../../components/common/BackButton";
import { Button } from "../../components/common/Button";
import { primary, black, gray3 } from "../../assets/styles/palettes";

const Wrapper = styled.div`
  margin: 0% 5% 0% 5%;
  width: 90%;
  height: 80vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 90%;
  height: 70px;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  z-index: 10;
`;

const Contents = styled.div`
  margin: 0% 5% 0% 5%;
  height: 100%;
  padding-top: 70px;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  font-size: 18px;
  color: ${black};
  margin-top: 5%;
  margin-bottom: 15%;
  & > p {
    margin: 0px 0;
    font-weight: 600;
  }
`;

const Input = styled.input`
  font-family: Pretendard;
  font-size: 18px;
  height: 40px;
  margin-top: 50px;
  margin-bottom: 50px;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom-color: ${gray3};
  border-bottom-width: 1px;
`;

export default function Login() {
  const navigate = useNavigate();
  const onClickBackBtn = () => {
    navigate(-1);
  };

  return (
    <Wrapper>
      <Header>
        <BackButton onClickBtn={onClickBackBtn}></BackButton>
      </Header>
      <Contents>
        <Content>
          <p>닉네임을 입력해주세요</p>
        </Content>
        <Input placeholder="닉네임 입력"></Input>
        <Button
          width="100%"
          height="50px"
          color="white"
          backcolor={primary}
          border="1px solid #00116A"
          fontSize="18px"
          padding="2% 4% 2% 4%"
          margin="0% 4% 2% 0%"
        >
          다음
        </Button>
      </Contents>
    </Wrapper>
  );
}
