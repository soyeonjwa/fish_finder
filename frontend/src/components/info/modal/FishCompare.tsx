import React from 'react'
import styled from 'styled-components';

import data from '../../../services/dummy/compareFish.json';
import { gray3 } from '../../../assets/styles/palettes';

interface FishCompareProps{
    sourceFishId : number,
    targetFishId : number
}

const Wrapper = styled.div`
    width: 100%;
    height : 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const Contents = styled.div`
    width : 46%;
    height : auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Image = styled.img`
    width: 95%;
    object-fit: cover;
    margin-bottom : 5%;
`

const Name = styled.div`
    font-size : 17px;
    margin : 5% 0 10% 0;
`

const Content = styled.div`
    display : flex;
    flex-direction: column;
    justify-content: center;
    font-size : 15px;
    height : 70px;
`

const Line = styled.div`
    height : 100%;
`

export default function FishCompare({sourceFishId, targetFishId} : FishCompareProps) {
  return (
    <Wrapper>
        <div style = {{display:'none'}}>{sourceFishId} {targetFishId}</div>
        <Contents>
            <Image src = {data[0].imgUri}></Image>
            <Name>{data[0].name}</Name>
            {
                data[0].contentList && (
                    data[0].contentList.map((content, index)=>(
                        <Content key = {index}>
                            {content.content}
                        </Content>
                    ))
                )
            }
        </Contents>
        <Line style = {{borderRight : `1px solid ${gray3}`}}></Line>
        <Contents>
            <Image src = {data[1].imgUri}></Image>
                <Name>{data[1].name}</Name>
                {
                    data[1].contentList && (
                        data[1].contentList.map((content, index)=>(
                            <Content key = {index}>
                                {content.content}
                            </Content>
                        ))
                    )
                }    
        </Contents>  
    </Wrapper>
    
  )
}
