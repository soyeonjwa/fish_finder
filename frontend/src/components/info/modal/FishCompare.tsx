import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

import { gray3 } from '../../../assets/styles/palettes';

import { axiosInstance } from '../../../services/axios';
import { AxiosResponse } from 'axios';

interface FishCompareProps{
    sourceFishId : number,
    targetFishId : number
}

interface Compare{
    fishId : number
    name : string
    imgUri : string
    contentList : Content[]
}


interface Content{
    content : string
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
  
    const [data, setData] = useState<Compare[]>();

    useEffect(()=>{
        axiosInstance.get(`/api/fishes/differences/${sourceFishId}/${targetFishId}`)
            .then((res:AxiosResponse) => {
                setData(res.data.data)
            })
            .catch((error) => {throw new Error(error.message)})
    },[])
  
    return (
        <Wrapper>
            <div style = {{display:'none'}}>{sourceFishId} {targetFishId}</div>
            { data && 
                <>
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
                </>
            }  
        </Wrapper>
        
    )
    }
