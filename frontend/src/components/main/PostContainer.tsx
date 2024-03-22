import React from 'react'
import styled from 'styled-components';


import dataSet from '../../services/dummy/popularPost.json';
import PostCard from './PostCard';

const Wrapper = styled.div`
  display : grid;
	grid-template-columns: 1fr 1fr;
  column-gap: 5%;
  row-gap : 5%;
`

export default function PostContainer() {
  return (
    <Wrapper>
        {
            dataSet && dataSet.map((data) => (
                <PostCard 
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
                ></PostCard>
            ))
        }
    </Wrapper>
  )
}
