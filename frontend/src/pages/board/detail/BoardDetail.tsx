import React from 'react'
import styled from 'styled-components'

import Header from '../../../components/board/detail/Header';
import TopContents from '../../../components/board/detail/TopContents';
import MidContent from '../../../components/board/detail/MidContent';
import BottomContent from '../../../components/board/detail/BottomContent';


const Wrapper = styled.div`
  margin : 0% 5% 0% 5%;
  width : 90%;
  height : auto;

  display : flex;
  flex-direction : column;
`

const Contents = styled.div`
  width : 100%;
  height: auto;
`


export default function BoardDetail() {
  const data = {
      "id" : 1,
      "title" : "광어 가격 올려치기 당함",
      "content" : "노량진에서 광어 가격 올려치기 당했어요 가지 마세요..",
      "createdAt" : "2024-03-11T01:00:39.864734",
      "writer" : "좌방구",
      "postType" : "review",
      "thumbnail" : ["https://media-cdn.tripadvisor.com/media/photo-s/1c/4e/e5/2a/caption.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFGnV4UdK55psmZji9bPkfqZX6qvMBeZF8NTFyjYjdNg&s",
        "https://media-cdn.tripadvisor.com/media/photo-s/1c/4e/e5/2a/caption.jpg"],
      "likeCount" : 50,
      "scrapCount" : 100,
      "commentCount" : 100
  }

  return (
    <Wrapper>
      <Header/>
      <Contents>
        <TopContents
          postType = {data.postType}
          title = {data.title}
          writer = {data.writer}
          createdAt= {data.createdAt}
        />
        <MidContent
          content = {data.content}
          thumbnail = {data.thumbnail}
        />
        <BottomContent
          likeCount={data.likeCount}
          commentCount={data.commentCount}
        />
      </Contents>
      <hr style={{width : '100%'}}></hr>
    </Wrapper>
  )
}
