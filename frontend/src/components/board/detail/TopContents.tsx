import React from 'react'
import styled from 'styled-components'

import { Button } from '../../common/Button';
import { gray4, primary } from '../../../assets/styles/palettes';

interface TopContentProps{
    postType : string;
    title : string;
    writer : string;
    createdAt : string;
}

const Wrapper = styled.div`
  width : 100%;
  height : auto;
  margin-bottom : 6%;
`

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin : 2% 0 2% 0;
`

const NameTimeContent = styled.div`
  width : 100%;
  height : auto;
  font-size : 15px;
  color : ${gray4};
`

export default function TopContents({postType, title, writer, createdAt} : TopContentProps) {
    const formatCreatedAt = (createdAtString : string) => {
        const now = new Date();
        const createdAt = new Date(createdAtString);
    
        const isSameDay = now.getDate() === createdAt.getDate() &&
                          now.getMonth() === createdAt.getMonth() &&
                          now.getFullYear() === createdAt.getFullYear();
    
        if (isSameDay) {
            const hours = createdAt.getHours().toString().padStart(2, '0');
            const minutes = createdAt.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        } else {
            const month = (createdAt.getMonth() + 1).toString().padStart(2, '0'); 
            const date = createdAt.getDate().toString().padStart(2, '0');
            return `${month}.${date}`;
        }
      };
  
    return (
        <Wrapper>
            {postType=="review"&& (
                <Button
                    width='auto'
                    height='auto'
                    color = {primary}
                    border = '1px solid #00116A'
                    fontSize = '16px'
                    padding = '2% 4% 2% 4%'
                    margin = '0% 4% 2% 0%'
                    backcolor= 'white'
                >
                    리뷰
                </Button>
            )}
            <Title>{title}</Title>
            <NameTimeContent> {writer} &nbsp; {formatCreatedAt(createdAt)}</NameTimeContent>
        </Wrapper>
    )
}
