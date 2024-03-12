import React from 'react'

import data from '../../../services/dummy/boardList.json';

import BoardCard from './BoardCard';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin : 0% 5% 0% 5%;
  width : 90%;
  height : auto;
`

export default function BoardContainer() {
  return (
    <Wrapper>
        {data && 
            data.map(data => (
                    <BoardCard
                        id = {data.id}
                        title = {data.title}
                        content = {data.content}
                        createdAt = {data.createdAt}
                        writer = {data.writer}
                        postType={data.postType}
                        thumbnail={data.thumbnail}
                        likeCount={data.likeCount}
                        scrapCount={data.scrapCount}
                        commentCount={data.commentCount}
                        key = {data.id}
                    ></BoardCard>
            ))
        }
    </Wrapper>
  )
}
