import React from 'react'
import styled from 'styled-components';
import CommentCard from './CommentCard';

import { gray2 } from '../../../assets/styles/palettes';

interface Comments{
  comments : Comment[];
}

interface Comment{
  commentId : number;
  commentWriterId : number;
  commentCreatedAt : string;
  commentWriterNickname : string;
  commentContent : string;
}

const Wrapper = styled.div`
  width : 100%;
  height: auto;
`

const CommentHr = styled.hr`
  background: ${gray2};
  height:0.5px;
  border:0;
`

export default function CommentContainer({comments} : Comments) {
  return (
    <Wrapper>
      {
        comments && (
          comments.map((comment, index)=>(
            <>
              <CommentCard
                commentId={comment.commentId}
                commentWriterId = {comment.commentWriterId}
                commentCreatedAt = {comment.commentCreatedAt}
                commentWriterNickname= {comment.commentWriterNickname}
                commentContent={comment.commentContent}
                key = {index}
              />
              <CommentHr/>
            </>
          )) 
        )
      }
    </Wrapper>
  )
}
