import React, { useState } from "react";
import styled from "styled-components";

import BoardContainer from "../../components/common/board/BoardContainer";
import EditIcon from "../../assets/icons/edit.svg";
import marketImage1 from "../../assets/images/market/노량진1.jpg";
import { gray3, primary } from "../../assets/styles/palettes";
interface TagBoxProps {
  active: boolean;
}
const Wrapper = styled.div`
  width: 100%;
  height: auto;
  margin: 0;
`;

const Header = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
`;

const ImageContainer = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
`;

const Profile = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  bottom: 10%;
  left: 5%;
  color: white;
  font-size: 10px;
  font-weight: 300;
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(0, 0, 0, 0.5)
  );
`;
const NicknameBox = styled.div`
  display: flex;
  flex-direction: row;
`;
const Nickname = styled.span`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const Tag = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2%;
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
const Contents = styled.div`
  margin: 0% 5% 0% 5%;
`;

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("작성글");
  return (
    <Wrapper>
      <Header>
        <ImageContainer src={marketImage1} alt="노량진" />
        <GradientOverlay></GradientOverlay>
        <Profile>
          <NicknameBox>
            <Nickname>좌랑둥이님</Nickname>
            <img src={EditIcon} alt="" />
          </NicknameBox>
          <span>작성글 8 | 작성댓글 12 | 스크랩한 글 11</span>
        </Profile>
      </Header>
      <Contents>
        <Tag>
          <TagBox
            active={activeTab === "작성글"}
            onClick={() => setActiveTab("작성글")}
          >
            <span>작성글</span>
          </TagBox>
          <TagBox
            active={activeTab === "댓글단 글"}
            onClick={() => setActiveTab("댓글단 글")}
          >
            <span>댓글단 글</span>
          </TagBox>
          <TagBox
            active={activeTab === "스크랩한 글"}
            onClick={() => setActiveTab("스크랩한 글")}
          >
            <span>스크랩한 글</span>
          </TagBox>
        </Tag>

        <BoardContainer></BoardContainer>
        {activeTab === "작성글" && <div>내가 쓴 글 리스트</div>}
        {activeTab === "댓글단 글" && <div>내가 쓴 댓글 리스트</div>}
        {activeTab === "스크랩한 글" && <div>스크랩한 글 리스트</div>}
      </Contents>
    </Wrapper>
  );
}
