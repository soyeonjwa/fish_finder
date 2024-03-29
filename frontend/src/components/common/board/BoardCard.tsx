import React from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import {gray2, gray3, primary} from '../../../assets/styles/palettes';
import ScrapIcon from '../../../assets/icons/scrap.svg';
import CommentsIcon from '../../../assets/icons/comments.svg';
import HeartIcon from '../../../assets/icons/heart.svg';
import ImageContainer from '../ImageContainer';
import { Button } from '../Button';
import { formatCreatedAt } from '../FormatCreatedAt';
import { userStore } from '../../../stores/userStore';

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

const Card = styled.div`
    width : 100%;
    height : auto;
    border-bottom: 1px solid ${gray2};
    display : flex;
    flex-direction : row;
`

const BoardContents = styled.div`
    font-family : Pretendard;
    width : 80%;
`

const UpContent = styled.div`
    display : flex;
    flex-direction : row;
    margin-left : 4%;
`
const Title = styled.div`
    font-size : 14px;
    font-weight : bold;
    margin-top : 5.5%;
`

const MidContent = styled.div`
    display : flex;
    flex-direction : row;
    font-size : 11px;
    color : ${gray3};
    margin-left : 4%;
    margin-top : 2%;
`

const ButtomContent = styled.div`
    display : flex;
    flex-direction : row;
    margin : 3% 4% 4% 4%;

    & > div{
        font-size : 11px;
        color : ${gray3};
        margin-right : 4%;
        margin-left : 1%;
}
`
const BoardImage = styled.div`
    position : relative;
    width : 70px;
    height: 70px;
    padding : 2%;
`

const Image = styled(ImageContainer)`
    position: absolute;
    top: 0;
    left: 0;
`

export default function BoardCard({id, title,  createdAt, postType, writer, thumbnail, likeCount, scrapCount, commentCount} : BoardInfo) {
    const navigate = useNavigate();
    const {userId} = userStore();

    const onClickCard = () => {
        if(userId===-1) navigate('/login')
        else navigate(`/board/${id}`)
    }   


    return (
        <Card key={id} onClick = {() => onClickCard()}>
            <BoardContents>
                <UpContent>
                    {postType==="review" &&
                        <Button
                            width='auto'
                            height='auto'
                            color = {primary}
                            border = '1px solid #00116A'
                            fontSize = '12px'
                            padding = '2% 4% 2% 4%'
                            margin = '4% 4% 0% 0%'
                            backcolor= 'white'
                        >
                            리뷰
                        </Button>
                    }
                    <Title>{title}</Title>
                </UpContent>
                <MidContent>
                    {writer} &nbsp; {formatCreatedAt(createdAt)}
                </MidContent>
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
            </BoardContents>

            <BoardImage>
                {thumbnail &&
                    <Image
                        src = {thumbnail}
                        alt = '썸네일'
                        width= '100%'
                        height='100%'
                    ></Image>}
            </BoardImage>
        </Card>
    )
}
 