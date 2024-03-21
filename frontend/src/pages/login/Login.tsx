import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import BackButton from "../../components/common/BackButton";
import MainLogo from "../../assets/icons/mainLogo.png";
import KakaoLogin from "../../assets/icons/kakaoLogin.png";
import { black } from "../../assets/styles/palettes";
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
  width: 100%;
  height: 100%;
  padding-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LogoImg = styled.img`
  width: 50%;
  margin-bottom: 5%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 18px;
  color: ${black};
  justify-content: center;
  align-items: center;
  margin-bottom: 20%;
  & > p {
    margin: 0px 0;
  }
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
        <LogoImg src={MainLogo}></LogoImg>
        <Content>
          <p>간편하게 로그인하고</p>
          <p>다양한 서비스를 이용해보세요</p>
        </Content>
        <img src={KakaoLogin} alt="kakaoLogin" />
      </Contents>
    </Wrapper>
  );
}
