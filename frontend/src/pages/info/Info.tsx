import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';

import { Wrapper } from '../../components/common/Wrapper'
import FishInfoCard from '../../components/info/FishInfoCard';
import BackButton from '../../components/common/BackButton';
import Warning from "../../assets/icons/warning.svg";
import FishCompareCard from '../../components/search/FishCompareCard';

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
  return (
    <Wrapper>
      <Header>
        <BackButton onClickBtn={()=>{navigate(-1)}}></BackButton>
        <span>어종검색</span>
        <div style={{width:'7%'}}></div>
      </Header>
      <FishInfoCard
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
                <FishCompareCard fishId={fish.fishId} name = {fish.name} imgUri={fish.imgUri} onClickCard={()=>{alert(fish.name)}} key={fish.fishId}></FishCompareCard>
              ))}
            </SimliarFishContainer>
          </>
      )}
    </Wrapper>
  )
}
