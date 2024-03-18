import React from 'react'

import data from '../../../services/dummy/boardList.json';

import BoardCard from './BoardCard';

export default function BoardContainer() {
  return (
    <div>
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
        }</div>
  )
}
