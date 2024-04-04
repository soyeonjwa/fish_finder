import React from 'react'
import styled from 'styled-components';

import { formatCreatedAt } from '../../common/FormatCreatedAt';
import { gray3 } from '../../../assets/styles/palettes';

interface Comment{
    commentId : number;
    commentWriterId : number;
    commentCreatedAt : string;
    commentWriterNickname : string;
    commentContent : string;
}

const Wrapper = styled.div`
    width: 100%;
    height : auto;
    margin : 3% 0 6% 0;
`

const Title = styled.div`
    display : flex;
    flex-direction: row;
    margin-bottom : 3%;
`

const NickName = styled.div`
    font-size : 16px;
    margin-right: 3%;
`

const Date = styled.div`
    margin-top : 4px;
    font-size : 14px;
    color : ${gray3};
`
const Content = styled.div`
    font-size : 16px;
`

export default function CommentCard({commentCreatedAt, commentWriterNickname, commentContent} : Comment) {
  return (
    <Wrapper>
        <Title>
            <NickName>{commentWriterNickname}</NickName>
            <Date>{formatCreatedAt(commentCreatedAt)}</Date>
        </Title>
        <Content>{commentContent}</Content>
    </Wrapper>
  )
}
