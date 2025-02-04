import React, { useEffect, useState } from "react";
import styled from "styled-components";

import SearchBox from "../../components/common/SearchBox";
import WordContents from "../../components/search/SearchWordContents";
import { useLocation, useNavigate } from "react-router-dom";
import FishCompareCard from "../../components/search/FishCompareCard";
import { NavBarWrapper } from "../../components/common/Wrapper";

import { axiosInstance } from "../../services/axios";
import { AxiosResponse } from "axios";

interface fishData{
  fishId : number
  name : string
}


const Wrapper = styled(NavBarWrapper)`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  height : 60px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  & > span {
    font-size: 18px;
    font-weight: bold;
  }
`;
const Content = styled.div`
  width: 100%;
  height: auto;
`;


const CardContent = styled.div`
  display : grid;
  grid-template-columns: repeat(2,1fr);
  row-gap :5%; 
  column-gap: 3%;
`



export default function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParam = new URLSearchParams(location.search);

  const [seasonFishList, setSeasonFishList] = useState<fishData[]>([]);

  const [value, setValue] = useState<string|null>("");
  const handleSubmit = () => {
    console.log({ value });
  };

  const onClickCard = (id : number) => {
    navigate(`/info/${id}`)
  }

 

  useEffect(()=>{
    if(!queryParam.get("query")){
      const todayMonth = new Date().getMonth();

      axiosInstance.get(`/api/fishes/season?ss=${todayMonth}월`)
        .then((res : AxiosResponse)=>{
          setSeasonFishList(res.data.data.fishList)
        })
    }
    else setValue(queryParam.get("query"))
  }, [queryParam.get("query")])

  
  return (
    <Wrapper>
      <Header>
        <span>어종검색</span>
      </Header>
      <SearchBox
        width="100%"
        name="query"
        margin="0 0 5% 0"
        value={value?value:""}
        setValue={setValue}
        handleSubmit={handleSubmit}
      ></SearchBox>
      
        {
          !queryParam.get("query")? (
            <Content>
              <WordContents
                title="최근 검색어종"
                fishlist={[{fishId : 1, name : "방어"}, {fishId:2, name: "잿방어"}, {fishId:3, name:"부시리"}]}
              ></WordContents>
              <div>{queryParam}</div>
              <WordContents
                title="추천 검색어종"
                fishlist={seasonFishList}
              ></WordContents>
            </Content>
          ):
          (
            <CardContent>
              <FishCompareCard fishId = {1} name = '잿방어' imgUri="http://www.suhyupnews.co.kr/news/photo/202207/29429_24324_1317.jpg" onClickCard={onClickCard}/>
            </CardContent>
          )
        }
        
    </Wrapper>
  );
}
