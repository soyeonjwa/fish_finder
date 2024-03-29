import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import BoardContainer from '../../components/common/board/BoardContainer'
import SearchBox from '../../components/common/SearchBox'
import { Button } from '../../components/common/Button'
import { primary, black } from '../../assets/styles/palettes'
import { Modal } from '../../components/common/Modal'
import { Overlay } from '../../components/common/Overlay'
import { NavBarWrapper } from '../../components/common/Wrapper'
import { BoardType } from '../../components/common/board/BoardContainer'

import { axiosInstance } from '../../services/axios'
import { AxiosResponse } from 'axios'



const StyledWrapper = styled(NavBarWrapper)<{isOpen:boolean}>`
`

const Header = styled.div`
  position : fixed;
  top : 0;
  bottom : 0;
  width : 90%;
  height : 70px;

  @media only screen and (max-width: 210px) {
    height : 50px;
  }

  @media only screen and (min-width: 375px) {
    height : 75px;
  }

  @media only screen and (min-width: 430px) {
    height : 85px;
  }

  background-color : #FFFFFF;
  display : flex;
  flex-direction : row;
  z-index:10;
`

const MidContent = styled.div`
  padding-top : 70px;

  @media only screen and (max-width: 210px) {
    padding-top : 50px;
  }

  @media only screen and (min-width: 375px) {
    padding-top : 75px;
  }

  @media only screen and (min-width: 430px) {
    padding-top : 85px;
  }
`

const RadioButton = styled.input`
  opacity : 0;
`

const RadioLabel = styled.label<{bold: boolean}>`
  color : ${black};
  font-size : 19px;
  font-weight: ${({ bold }) => bold ? 'bold' : 'normal'};
`

const StyledModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`
const StyledButton = styled(Button)`
  position : fixed;
  bottom : 90px;
  right : 5%;
  border-radius: 20px;
  font-weight: 500;
`


export default function Board() {
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [sort, setSort] = useState("최신순");
  const [boards, setBoards] = useState<BoardType[]>([]);
  const navigate = useNavigate();

  const onClickRadio = (name : string) => {
    setSort(name);
    setIsOpen(!isOpen);
  }

  const onClickBtn = () => {
    setIsOpen(!isOpen);
  }

  const handleSubmit = () =>{
    console.log({value})
  }

  const onClickRegisterBtn = () => {
    navigate("/board/register")
  }

  useEffect(()=>{
    axiosInstance.get('/api/board')
      .then((res:AxiosResponse) => {
        setBoards(res.data.data)
      })
  },[])

  useEffect(()=>{
    let url : string = "/api/board"
    if(sort === "최신순"){
      url += "?sortBy=createdAt"
    }
    else if(sort ==="인기순"){
      url += "?sortBy=likeCount"
    }
    else if(sort === "리뷰만"){
      url += "?sortBy=createdAt&postType=review"
    }
    else{
      url += "?sortBy=likeCount&postType=review"
    }

    console.log(url)
    axiosInstance.get(url)
      .then((res:AxiosResponse) => {
        setBoards(res.data.data)
      })
  },[sort])

  return (
    <div>
    <StyledWrapper isOpen = {isOpen}>
      {isOpen && <Overlay onClick={onClickBtn}/>}
      <Header>
        <SearchBox
          width = '80%'
          name = 'boardSearch'
          margin = '5% 1% 5% 0'
          value = {value}
          setValue={setValue}
          handleSubmit={handleSubmit}
        ></SearchBox>
        <Button
          width = '20%'
          height = 'auto'
          margin = '5% 0 5% 0'
          color = {primary}
          border = '1px solid #00116A'
          onClick={onClickBtn}
        >{sort}</Button>
      </Header>
      <MidContent>
        <BoardContainer boards = {boards}></BoardContainer>
      </MidContent>
    </StyledWrapper>
     {
      isOpen &&
      (
        <StyledModal>
          <div>
            <RadioButton type = "radio" id = "last" name = "sort" onClick={() => onClickRadio("최신순")} defaultChecked></RadioButton>
            <RadioLabel htmlFor = "last" bold={sort === "최신순"}>최신순</RadioLabel>
          </div>
          <div>
            <RadioButton type = "radio" id = "popular" name = "sort" onClick={() => onClickRadio("인기순")}></RadioButton>
            <RadioLabel htmlFor = "popular" bold={sort === "인기순"}>인기순</RadioLabel>
          </div>
          <div>
            <RadioButton type = "radio" id = "review" name = "sort" onClick={() => onClickRadio("리뷰만")}></RadioButton>
            <RadioLabel htmlFor = "review" bold={sort === "리뷰만"}>리뷰만보기</RadioLabel>
          </div>
          <div>
            <RadioButton type = "radio" id = "whole" name = "sort" onClick={() => onClickRadio("리뷰  인기글")}></RadioButton>
            <RadioLabel htmlFor = "whole" bold={sort === "리뷰  인기글"}>리뷰인기글</RadioLabel>
          </div>
        </StyledModal>
      )
     }
    <StyledButton
      border = '0px'
      color = 'white'
      backcolor= {primary}
      margin = '0'
      width='25%'
      height='auto'
      padding = '3% 3% 3% 3%'
      fontSize='16px'
      onClick={()=>onClickRegisterBtn()}
    >+ 글쓰기</StyledButton>
    </div>
  )
}