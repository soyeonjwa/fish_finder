import React from "react";
import styled from "styled-components";

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
  return (
    <Wrapper>
      <Contents>
        <LogoImg src={MainLogo}></LogoImg>
        <Content>
          <p>간편하게 로그인하고</p>
          <p>다양한 서비스를 이용해보세요</p>
        </Content>
        <img src={KakaoLogin} alt="kakaoLogin" onClick={()=>window.open(`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=7d5f2d8e91d5566b9e9cf07c36b7a2d2&redirect_uri=http://test.fishfinder.site/oauth/callback/kakao`)}/>
        {/* <img src={KakaoLogin} alt="kakaoLogin" onClick={()=>window.open(`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}`)}/> */}
      </Contents>
    </Wrapper>
  );
}
