import React from "react";
import styled from "styled-components";

import HomeIcon from "../../assets/icons/home.svg";
import ScanIcon from "../../assets/icons/footerScan.svg";
import MyIcon from "../../assets/icons/footerMy.svg";
import BoardIcon from "../../assets/icons/footerBoard.svg";
import SearchIcon from "../../assets/icons/footerSearch.svg";
import { gray4, primary } from "../../assets/styles/palettes";
import { Link, Outlet } from "react-router-dom";
import { userStore } from "../../stores/userStore";

const Wrapper = styled.div`
  height: 73px;
  width: 100%;

  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: row;

  background-color: white;
  z-index: 1000;

  @media only screen and (max-width: 300px) {
    height: 60px;
  }

  @media only screen and (min-width: 400px) {
    height: 80px;
  }

  @media only screen and (min-width: 430px) {
    height: 90px;
  }

  @media only screen and (min-width: 500px) {
    height: 100px;
  }
`;

const Block = styled(Link)`
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
`;

const Image = styled.img`
  padding: 20% 20% 10% 20%;
  width: 45%;
`;

const Title = styled.div`
  font-family: Pretendard;
  font-size: 11px;
  margin-bottom: 10%;
  color: ${gray4};
`;

const CenterBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${primary};
  border-radius: 50%;
  margin: 1%;
  display: flex;
  justify-content: center;
  align-items: center;

  & > img {
    padding: 20% 20% 20% 20%;
    width: 45%;
  }
`;

export default function Footer() {
  const { userId } = userStore();
  return (
    <>
      <Outlet />
      <Wrapper>
        <Block to="/">
          <Image src={HomeIcon}></Image>
          <Title>홈</Title>
        </Block>

        <Block to="/search">
          <Image src={SearchIcon}></Image>
          <Title>어종검색</Title>
        </Block>

        <Block to="/scan">
          <CenterBox>
            <Image src={ScanIcon}></Image>
          </CenterBox>
        </Block>

        <Block to="/board">
          <Image src={BoardIcon}></Image>
          <Title>게시판</Title>
        </Block>
        <Block to={userId == -1 ? `/login` : "/mypage"}>
          <Image src={MyIcon}></Image>
          <Title>MY</Title>
        </Block>
      </Wrapper>
    </>
  );
}
