import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { primary, gray3 } from "../../assets/styles/palettes";
import { Wrapper } from "../../components/common/Wrapper";
import fishfinder from "../../assets/images/tutorial/물어바종.png";
import logo from "../../assets/images/tutorial/로고.png";
import downArrow from "../../assets/icons/caretDoubleDown.svg";
import defence from "../../assets/images/tutorial/방어.png";
import comparison from "../../assets/images/tutorial/비교.png";
import price from "../../assets/images/tutorial/시세.png";
import camera from "../../assets/images/tutorial/스캔 화면-1.png";
import search from "../../assets/images/tutorial/검색.png";
import board from "../../assets/images/tutorial/게시판.png";
import Login from "../login/Login";
import useMoveScroll from "./useMoveScroll";

interface TagBoxProps {
  active: boolean;
}

const Tag = styled.div`
  background-color: white;
  width: 90%;
  display: flex;
  flex-direction: row;
  z-index: 1000;
`;

const TagBox = styled.div<TagBoxProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33%;
  height: 40px;
  color: ${(props) => (props.active ? primary : gray3)};
  border-bottom: 1px solid ${(props) => (props.active ? primary : gray3)};

  & > span {
    font-size: 15px;
    font-weight: ${(props) => (props.active ? 700 : 500)};
  }
`;

const CenterWrapper = styled(Wrapper)`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin: 5% 5% 5% 5%;
`;

const MarginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5% 0 5% 0;
`;

const Image = styled.img`
  display: block;
`;

function Tutorial() {
  const scan = useMoveScroll();
  const keyword = useMoveScroll();
  const infoBoard = useMoveScroll();

  return (
    <div>
      <CenterWrapper height="95vh">
        <div>수산시장 이용 도우미</div>
        <CenterWrapper>
          <img src={fishfinder} alt="물어바종" width="70%" />
        </CenterWrapper>
        <img src={logo} alt="로고" />
        <div style={{ margin: "20% 0 5% 0" }}>자세히 알아보기</div>
        <CenterWrapper>
          <img src={downArrow} alt="아래로" width="30%" />
        </CenterWrapper>
      </CenterWrapper>
      <CenterWrapper>
        <CenterWrapper>
          <div>한국 수산 시장 주 거래품목</div>
          <div>약 20여종의</div>
          <div>어종 정보를 한눈에</div>
        </CenterWrapper>
        <MarginWrapper>
          물고기에 대한 정보
          <Image src={defence} alt="방어" />
        </MarginWrapper>
        <MarginWrapper>
          비슷한 물고기 비교법
          <Image src={comparison} alt="비교" />
        </MarginWrapper>
        <MarginWrapper>
          평균 시세까지
          <Image src={price} alt="시세" />
        </MarginWrapper>
        <MarginWrapper>다양한 방법을 통해 정보를 얻어보세요!</MarginWrapper>
      </CenterWrapper>
      <CenterWrapper height="95vh" ref={scan.element}>
        <Tag>
          <TagBox active={true} onClick={scan.onMoveToElement}>
            <span>스캔 검색</span>
          </TagBox>
          <TagBox active={false} onClick={keyword.onMoveToElement}>
            <span>키워드 검색</span>
          </TagBox>
          <TagBox active={false} onClick={infoBoard.onMoveToElement}>
            <span>정보 게시판</span>
          </TagBox>
        </Tag>
        <MarginWrapper>
          카메라를 통해
          <br />
          어종 정보를 검색하세요
          <Image src={camera} alt="스캔" width="60%" />
        </MarginWrapper>
      </CenterWrapper>
      <CenterWrapper height="95vh" ref={keyword.element}>
        <Tag>
          <TagBox active={false} onClick={scan.onMoveToElement}>
            <span>스캔 검색</span>
          </TagBox>
          <TagBox active={true} onClick={keyword.onMoveToElement}>
            <span>키워드 검색</span>
          </TagBox>
          <TagBox active={false} onClick={infoBoard.onMoveToElement}>
            <span>정보 게시판</span>
          </TagBox>
        </Tag>
        <MarginWrapper>
          키워드를 통해
          <br />
          어종 정보를 검색하세요
          <Image src={search} alt="검색" width="60%" />
        </MarginWrapper>
      </CenterWrapper>
      <CenterWrapper height="95vh" ref={infoBoard.element}>
        <Tag>
          <TagBox active={false} onClick={scan.onMoveToElement}>
            <span>스캔 검색</span>
          </TagBox>
          <TagBox active={false} onClick={keyword.onMoveToElement}>
            <span>키워드 검색</span>
          </TagBox>
          <TagBox active={true} onClick={infoBoard.onMoveToElement}>
            <span>정보 게시판</span>
          </TagBox>
        </Tag>
        <MarginWrapper>
          <CenterWrapper>
            게시판을 통해
            <br />
            유저들과 소통하세요
          </CenterWrapper>
          <Image src={board} alt="게시판" width="60%" />
        </MarginWrapper>
      </CenterWrapper>
      <CenterWrapper height="95vh">
        <Login />
        <Link to="/">홈으로</Link>
      </CenterWrapper>
    </div>
  );
}

export default Tutorial;
