import React, { useEffect, useState } from "react";
import styled from "styled-components";

import SearchBox from "../../components/common/SearchBox";
import WordContents from "../../components/search/SearchWordContents";
import { useLocation, useNavigate } from "react-router-dom";
import FishCompareCard from "../../components/search/FishCompareCard";
import { NavBarWrapper } from "../../components/common/Wrapper";

import { axiosInstance } from "../../services/axios";
import { AxiosResponse } from "axios";

interface fishData {
  fishId: number;
  name: string;
}

interface fishResultData extends fishData {
  imgUri: string;
}

const Wrapper = styled(NavBarWrapper)`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  height: 60px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  & > span {
    font-size: 20px;
    font-weight: bold;
  }
`;
const Content = styled.div`
  width: 100%;
  height: auto;
`;

const CardContent = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 15px;
  column-gap: 3%;
`;

export default function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParam = new URLSearchParams(location.search);

  const [recentFishList, setRecentFishList] = useState<fishData[]>([]);
  const [seasonFishList, setSeasonFishList] = useState<fishData[]>([]);
  const [resultFishList, setResultFishList] = useState<fishResultData[]>([]);

  const [value, setValue] = useState<string | null>("");
  const handleSubmit = () => {
    console.log({ value });
  };

  const onClickCard = (fish: fishData) => {
    const recentSearch: fishData[] = JSON.parse(
      localStorage.getItem("RecentSearch") || "[]"
    ).filter((e: fishData) => e.fishId != fish.fishId);

    if (recentSearch.length >= 6) recentSearch.splice(0, 1);

    recentSearch.push({ fishId: fish.fishId, name: fish.name });
    localStorage.setItem("RecentSearch", JSON.stringify(recentSearch));

    navigate(`/info/${fish.fishId}`);
  };

  useEffect(() => {
    const recentSearch: fishData[] = JSON.parse(
      localStorage.getItem("RecentSearch") || "[]"
    );
    setRecentFishList(recentSearch);
  }, []);

  useEffect(() => {
    if (!queryParam.get("query")) {
      const todayMonth = new Date().getMonth();

      axiosInstance
        .get(`/api/fishes/season?ss=${todayMonth}월`)
        .then((res: AxiosResponse) => {
          setSeasonFishList(res.data.data.fishList);
        });
    } else {
      setValue(queryParam.get("query"));

      axiosInstance
        .get(`/api/fishes/search?keyword=${queryParam.get("query")}`)
        .then((res: AxiosResponse) => {
          setResultFishList(res.data.data);
        });
    }
  }, [queryParam.get("query")]);

  return (
    <Wrapper>
      <Header>
        <span>어종검색</span>
      </Header>
      <SearchBox
        width="100%"
        name="query"
        margin="0 0 5% 0"
        value={value ? value : ""}
        setValue={setValue}
        handleSubmit={handleSubmit}
        handleSearchClick={() => {
          if (value) {
            navigate(`/search?query=${value}`);
          }
        }}
      ></SearchBox>

      {!queryParam.get("query") ? (
        <Content>
          <WordContents
            title="최근 검색어종"
            fishlist={[...recentFishList].reverse()}
          ></WordContents>
          <WordContents
            title="추천 검색어종"
            fishlist={seasonFishList}
          ></WordContents>
        </Content>
      ) : resultFishList && resultFishList.length > 0 ? (
        <Content>
          <CardContent>
            {resultFishList.map((fish: fishResultData) => (
              <FishCompareCard
                key={fish.fishId}
                fishId={fish.fishId}
                name={fish.name}
                imgUri={fish.imgUri}
                onClickCard={() =>
                  onClickCard({ fishId: fish.fishId, name: fish.name })
                }
                infoIcon={false}
              />
            ))}
          </CardContent>
        </Content>
      ) : (
        <div>검색 결과 없습니다.</div>
      )}
    </Wrapper>
  );
}
