import React from 'react'

import BoardCard from './BoardCard';

interface BoardContainerProps{
  boards : BoardType[]
}

export type BoardType = {
  boardId: number,
  title: string,
  content: string,
  writer: string,
  postType: string,
  thumbnail: string,
  likeCount: number,
  scrapCount: number,
  commentCount: number,
  createdAt: string
}

export default function BoardContainer({boards} : BoardContainerProps) {
  return (
    <div>
        {boards && 
            boards.map(data => (
                      <BoardCard
                        id = {data.boardId}
                        title = {data.title}
                        content = {data.content}
                        createdAt = {data.createdAt}
                        writer = {data.writer}
                        postType={data.postType}
                        thumbnail={data.thumbnail}
                        likeCount={data.likeCount}
                        scrapCount={data.scrapCount}
                        commentCount={data.commentCount}
                        key = {data.boardId}
                      ></BoardCard>
            ))
        }</div>
  )
}
