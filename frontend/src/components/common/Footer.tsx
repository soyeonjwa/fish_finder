import React from 'react'
import styled from 'styled-components'

import HomeIcon from '../../assets/icons/home.svg';
import ScanIcon from '../../assets/icons/footerScan.svg';
import MyIcon from '../../assets/icons/footerMy.svg';
import BoardIcon from '../../assets/icons/footerBoard.svg';
import SearchIcon from '../../assets/icons/footerSearch.svg';
import { gray4, primary } from '../../assets/styles/palettes';

const Wrapper = styled.div`
    height : auto;
    width : 99%;

    position : fixed;
    bottom : 0;
    display : flex;
    flex-direction : row;

    background-color : white;
`

const Block = styled.div`
    width : 20%;
    display : flex;
    flex-direction : column;
    align-items : center;
`

const Image = styled.img`
    padding : 20% 20% 10% 20%;
    width : 45%;
`

const Title = styled.div`
    font-family : Pretendard;
    font-size : 11px;
    margin-bottom : 10%;
    color : ${gray4}
`

const CenterBox = styled.div`
    width : 20%;
    height : auto;
    background-color : ${primary};
    border-radius : 50%;
    margin : 1%;
    display: flex;
    justify-content: center;
    align-items: center;

    & > img{
        padding : 20% 20% 20% 20%;
        width : 45%;
    }
`

export default function Footer() {
  return (
    <Wrapper>
        <Block>
            <Image src = {HomeIcon} ></Image>
            <Title>홈</Title>
        </Block>
        <Block>
            <Image src = {SearchIcon} ></Image>
            <Title>어종검색</Title>
        </Block>
        <CenterBox>
            <Image src = {ScanIcon}></Image>
        </CenterBox>
        <Block>
            <Image src = {BoardIcon} ></Image>
            <Title>게시판</Title>
        </Block>
        <Block>
            <Image src = {MyIcon} ></Image>
            <Title>MY</Title>
        </Block>

    </Wrapper>
  )
}
