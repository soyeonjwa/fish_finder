import React, { useState } from "react";
import styled from "styled-components";

import SearchBox from "../../components/common/SearchBox";
import WordContents from "../../components/search/SearchWordContents";
// import FishInfoCard from "../../components/search/FishInfoCard";
// import FishCompareCard from "../../components/search/FishCompareCard";
// import Warning from "../../assets/icons/warning.svg";

const Wrapper = styled.div`
  width: 100%;
  margin: 0% 5% 0% 5%;
  height: auto;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  position: relative;
  margin: 0% 5% 0% 5%;
  width: 90%;
  padding-top: 7%;

  & > span {
    font-size: 18px;
    font-weight: bold;
  }
`;

const Content = styled.div`
  width: 90%;
  height: auto;
  margin-left: 5%;
  margin-right: 5%;
`;

// const Warn = styled.div`
//   display: flex;
//   flex-direction: row;
//   color: red;
//   font-size: 16px;
// `;

// const WarnImg = styled.img`
//   margin-right: 5px;
// `;

// const SimliarFishContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
// `;

// const data = {
//   name: "잿방어",
//   information:
//     "몸은 방추형으로 짧고 통통하며 체고가 높은 편이다. 위턱 뒷끝 부분은 눈의 중앙 아래에 도달하며 뒤끝 윗부분은 둥글다...",
//   price1: 45000,
//   price2: 40000,
//   similarFish: ["방어", "부시리"],
// };

export default function Search() {
  const [value, setValue] = useState("");
  const handleSubmit = () => {
    console.log({ value });
  };
  return (
    <Wrapper>
      <Header>
        <span>어종검색</span>
      </Header>
      <SearchBox
        width="90%"
        name="fishSearch"
        margin="5% 0 5% 0"
        value={value}
        setValue={setValue}
        handleSubmit={handleSubmit}
      ></SearchBox>
      <Content>
        <WordContents
          title="최근 검색어"
          fishlist={["방어", "부시리", "잿방어", "광어", "연어", "참돔"]}
        ></WordContents>
        <WordContents
          title="추천 검색어"
          fishlist={["방어", "부시리", "잿방어", "광어", "연어", "참돔"]}
        ></WordContents>
        {/* <FishInfoCard
          name={data.name}
          information={data.information}
          price1={data.price1}
          price2={data.price2}
        ></FishInfoCard>
        {data.similarFish && (
          <>
            <Warn>
              <WarnImg src={Warning} alt="" />
              <p>유사어종에 주의하세요</p>
            </Warn>
            <SimliarFishContainer>
              {data.similarFish.map((fish, index) => (
                <FishCompareCard name={fish} key={index}></FishCompareCard>
              ))}
            </SimliarFishContainer>
          </>
        )} */}
      </Content>
    </Wrapper>
  );
}
