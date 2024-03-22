import React from 'react'
import styled from 'styled-components';

import MainLogo from '../../assets/icons/mainLogo.png';
import SearchIcon from '../../assets/icons/mainSearch.svg'
import ScanIcon from '../../assets/icons/mainScan.svg';
import { useNavigate } from 'react-router-dom';


const Wrapper = styled.div`
    display : flex;
    flex-direction : row;
    justify-content: center; 

    position: relative;
    margin : 0% 5% 0% 5%;
    width : 90%;

    padding-top : 7%;
    padding-bottom : 7%;
`

const LogoImg = styled.img`
    width : 35%;
`

const IconDiv = styled.div`
    position : absolute;
    right : 0;
    top : 42%;

    width : 15%;

    display : flex;
    flex-direction : row;
    justify-content : space-between;

    & > img{
        width : 45%;
        margin : 0%;
    }
`

export default function Header() {
  const navigate = useNavigate();
  return (
    <Wrapper>
        <LogoImg src = {MainLogo}></LogoImg>
        <IconDiv>
            <img src = {SearchIcon} onClick={()=>{navigate("/search")}}></img>
            <img src = {ScanIcon}></img>
        </IconDiv>
    </Wrapper>
  )
}
