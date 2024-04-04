import React, { useEffect } from "react";
import styled from "styled-components";

// import dataSet from "../../services/dummy/popularPost.json";
import PostCard from "./PostCard";

// import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../services/axios";
import { AxiosResponse } from "axios";

interface boardData {
  boardId: number; // 게시글 id
  title: string; // 제목
  content: string; // 내용
  createdAt: string; // 글 생성시간 ex) "2024-03-06T01:00:39.864734"
  writer: string; // 작성자 nickname
  postType: string; // 글 종류 ex) "review", "normal"
  thumbnail: string; // 썸네일 이미지url
  likeCount: number; // 좋아요 수
  scrapCount: number; // 스크랩 수
  commentCount: number; // 댓글 수
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 5%;
  row-gap: 5%;
`;

export default function PostContainer() {
  const [dataSet, setDataSet] = React.useState<boardData[]>([]);

  useEffect(() => {
    axiosInstance.get("/api/board/popular").then((res: AxiosResponse) => {
      setDataSet(res.data.data);
      console.log(dataSet);
    });
  }, []);

  return (
    <Wrapper>
      {dataSet &&
        dataSet.map((data, index) => (
          <PostCard
            id={data.boardId}
            title={data.title}
            content={data.content}
            createdAt={data.createdAt}
            writer={data.writer}
            postType={data.postType}
            thumbnail={data.thumbnail}
            likeCount={data.likeCount}
            scrapCount={data.scrapCount}
            commentCount={data.commentCount}
            key={index}
          ></PostCard>
        ))}
    </Wrapper>
  );
}
