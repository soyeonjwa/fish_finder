import React from "react";
import styled from "styled-components";

// import HomeIcon from "../../assets/icons/footerHome.svg";
// import HomeIconPrimary from "../../assets/icons/footerHomePrimary.svg";
// import MyIcon from "../../assets/icons/footerMy.svg";
// import MyIconPrimary from "../../assets/icons/footerMyPrimary.svg";
// import BoardIcon from "../../assets/icons/footerBoard.svg";
// import BoardIconPrimary from "../../assets/icons/footerBoardPrimary.svg";
// import SearchIcon from "../../assets/icons/footerSearch.svg";
// import SearchIconPrimary from "../../assets/icons/footerSearchPrimary.svg";
import FooterSvg from "../common/FooterSvg";
import ScanIcon from "../../assets/icons/footerScan.svg";

import { gray4, primary } from "../../assets/styles/palettes";
import { Link, Outlet, useLocation } from "react-router-dom";
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
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// const HomeIconImage = styled.img`
//   width: 40%;
// `;

const Image = styled.img`
  width: 45%;
`;

const Title = styled.div<{ isActivePage: boolean }>`
  display: flex;
  height: 20%;
  justify-content: center;
  align-items: center;
  font-family: Pretendard;
  font-size: 11px;
  color: ${(props) => (props.isActivePage ? primary : gray4)};
  font-weight: ${(props) => (props.isActivePage ? "bold" : "normal")};
`;

const CenterBox = styled.div`
  aspect-ratio: 1 / 1;
  height: 90%;
  background-color: ${primary};
  border-radius: 50%;
  margin: 10%;
  display: flex;
  justify-content: center;
  align-items: center;

  & > img {
    padding: 20% 20% 20% 20%;
    width: 60%;
  }
`;

export default function Footer() {
  const { userId } = userStore();
  const location = useLocation();

  return (
    <>
      <Outlet />
      <Wrapper>
        <Block to="/">
          <ImageContainer>
            {location.pathname === "/" ? (
              // <HomeIconImage
              //   // src={HomeIconPrimary}
              //   // alt="홈아이콘색상"
              // ></HomeIconImage>

              <FooterSvg id="footerhomeprimary" size={"60%"}></FooterSvg>
            ) : (
              // <HomeIconImage src={HomeIcon} alt="홈아이콘기본"></HomeIconImage>
              <FooterSvg id="footerhome" size={"60%"}></FooterSvg>
            )}
          </ImageContainer>

          <Title isActivePage={location.pathname === "/"}>홈</Title>
        </Block>

        <Block to="/search">
          <ImageContainer>
            {location.pathname === "/search" ? (
              // <Image src={SearchIconPrimary} alt="검색아이콘색상"></Image>
              <FooterSvg id="footersearchprimary" size={"70%"}></FooterSvg>
            ) : (
              // <Image src={SearchIcon} alt="검색아이콘기본"></Image>
              <FooterSvg id="footersearch" size={"70%"}></FooterSvg>
            )}
          </ImageContainer>

          <Title isActivePage={location.pathname === "/search"}>어종검색</Title>
        </Block>

        <Block to="/scan">
          <CenterBox>
            <Image src={ScanIcon} alt="스캔아이콘"></Image>
          </CenterBox>
        </Block>

        <Block to="/board">
          <ImageContainer>
            {location.pathname === "/board" ? (
              // <Image src={BoardIconPrimary} alt="보드아이콘색상"></Image>
              <FooterSvg id="footerboardprimary" size={"70%"}></FooterSvg>
            ) : (
              // <Image src={BoardIcon} alt="보드아이콘기본"></Image>
              <FooterSvg id="footerboard" size={"70%"}></FooterSvg>
            )}
          </ImageContainer>
          <Title isActivePage={location.pathname === "/board"}>게시판</Title>
        </Block>
        <Block to={userId == -1 ? `/login` : "/mypage"}>
          <ImageContainer>
            {location.pathname === "/mypage" ? (
              // <Image src={MyIconPrimary} alt="마이페이지아이콘색상"></Image>
              <FooterSvg id="footermyprimary" size={"70%"}></FooterSvg>
            ) : (
              // <Image src={MyIcon} alt="마이페이지아이콘기본"></Image>
              <FooterSvg id="footermy" size={"70%"}></FooterSvg>
            )}
          </ImageContainer>
          <Title isActivePage={location.pathname === "/mypage"}>MY</Title>
        </Block>
      </Wrapper>
    </>
  );
}
