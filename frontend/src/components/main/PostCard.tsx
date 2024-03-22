import React from 'react'
import styled from 'styled-components';

import ImageContainer from '../common/ImageContainer';
import { gray3, gray4 } from '../../assets/styles/palettes';
import ScrapIcon from '../../assets/icons/scrap.svg';
import CommentsIcon from '../../assets/icons/comments.svg';
import HeartIcon from '../../assets/icons/heart.svg';
import { useNavigate } from 'react-router-dom';

type BoardInfo = {
    id : number,
    title : string,
    content : string,
    createdAt : string,
    writer : string,
    postType : string,
    thumbnail : string,
    likeCount : number,
    scrapCount : number,
    commentCount : number
}

const Wrapper = styled.div`
    width : 100%;
    height : auto;

    display : flex;
    flex-direction : column;
`
const Writer = styled.div`
    margin-top : 3%;
    margin-bottom : 1%;
    font-size : 14px;
`
const Title = styled.div`
    font-size : 13px;
    color : ${gray4};
    margin-bottom : 3%;
`
const ButtomContent = styled.div`
    display : flex;
    flex-direction : row;

    & > div{
        font-size : 13px;
        color : ${gray3};
        margin-right : 4%;
        margin-left : 1%;
}`



export default function PostCard({id,title, writer, thumbnail, likeCount, scrapCount, commentCount} : BoardInfo) {
  const navigate = useNavigate();

  return (
    <Wrapper onClick={()=>{navigate(`/board/${id}`)}}>
        <ImageContainer
            src = {thumbnail}
            alt = "썸네일"
            width='100%'
            height = '150px'
        ></ImageContainer>
        <Writer>{writer}</Writer>
        <Title>{title}</Title>
        <ButtomContent>
                    <img
                        src = {ScrapIcon}
                    ></img>
                    <div>{scrapCount}</div>
                    
                    <img
                        src = {CommentsIcon}
                    ></img>
                    <div>{commentCount}</div>

                    <img
                        src = {HeartIcon}
                    ></img>
                    <div>{likeCount}</div>
                </ButtomContent>
    </Wrapper>
  )
}
