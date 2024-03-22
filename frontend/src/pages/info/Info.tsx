import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';


import { Wrapper } from '../../components/common/Wrapper'
import FishInfoCard from '../../components/info/FishInfoCard';
import BackButton from '../../components/common/BackButton';
import Warning from "../../assets/icons/warning.svg";
import FishCompareCard from '../../components/search/FishCompareCard';
import ModalHeader from '../../components/info/modal/Header';
import ModalFishCompare from '../../components/info/modal/FishCompare';

import data from '../../services/dummy/Fish.json';


const Header = styled.div`
  height : 60px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;



  & > span {
    font-size: 18px;
    font-weight: bold;
  }
`;


const Warn = styled.div`
  display: flex;
  flex-direction: row;
  color: red;
  font-size: 16px;
`;

const WarnImg = styled.img`
  margin-right: 5px;
`;

const SimliarFishContainer = styled.div`
  display : grid;
  grid-template-columns: repeat(2,1fr);
  row-gap :5%; 
  column-gap: 3%;
`;



export default function Info() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [targetFishId, setTargetFishId] = useState(-1);

  const chooseComparedFish = (key : number) => {
    setIsOpen(true);
    setTargetFishId(key)
  }

  return (
    <Wrapper>
      <Header>
        <BackButton onClickBtn={()=>{navigate(-1)}}></BackButton>
        <span>어종검색</span>
        <div style={{width:'7%'}}></div>
      </Header>
      <FishInfoCard
        id = {data.id}
        name  = {data.name}
        description = {data.description}
        otherPrice={data.otherPrice}
        ourPrice={data.ourPrice}
        imgUri = {data.imgUri}
      />
      {data.similarFish && (
          <>
            <Warn>
              <WarnImg src={Warning} alt="" />
              <p>유사어종에 주의하세요</p>
            </Warn>
            <SimliarFishContainer>
              {data.similarFish.map((fish) => (
                <FishCompareCard fishId={fish.fishId} name = {fish.name} imgUri={fish.imgUri} onClickCard={()=>chooseComparedFish(fish.fishId)} key={fish.fishId}></FishCompareCard>
              ))}
            </SimliarFishContainer>
          </>
      )}
      <Modal
        isOpen = {isOpen}
        ariaHideApp={false}
        style = {{
          overlay : {
            backgroundColor : 'rgb(26,26,26,0.5)'
          },
          content : {
            width : '70%',
            display : 'flex',
            flexDirection : 'column',
            alignSelf : 'center',
            justifySelf : 'center',
            borderRadius : '10px',
            height : '400px',
            overflow: 'auto',
            fontFamily : 'Pretendard',
            padding : '5%'
          }
        }}
      >
        <ModalHeader setIsOpen={setIsOpen}/>
        <ModalFishCompare sourceFishId = {data.id} targetFishId = {targetFishId}/>
      </Modal>
    </Wrapper>
  )
}
