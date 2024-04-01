import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal";

import { Wrapper } from "../../components/common/Wrapper";
import FishInfoCard from "../../components/info/FishInfoCard";
import BackButton from "../../components/common/BackButton";
import Warning from "../../assets/icons/warning.svg";
import FishCompareCard from "../../components/search/FishCompareCard";
import ModalHeader from "../../components/info/modal/Header";
import ModalFishCompare from "../../components/info/modal/FishCompare";

import { axiosInstance } from "../../services/axios";
import { AxiosResponse } from "axios";

interface FishInfo {
  fishId: number;
  name: string;
  imgUri: string;
  description: string;
  otherPrice: number;
  ourPrice: number;
  similarFish: SimilarFishInfo[];
}

interface SimilarFishInfo {
  fishId: number;
  name: string;
  imgUri: string;
}

const Header = styled.div`
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  & > span {
    font-size: 20px;
    font-weight: bold;
  }
`;

const Warn = styled.div`
  display: flex;
  flex-direction: row;
  color: red;
  font-size: 16px;
  margin-top: 5%;
`;

const WarnImg = styled.img`
  margin-right: 5px;
`;

const SimliarFishContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 5%;
  column-gap: 3%;
  margin: 0% 0 15% 0;
`;

export default function Info() {
  const navigate = useNavigate();
  const { fishId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [targetFishId, setTargetFishId] = useState(-1);
  const [sourceFish, setSourceFish] = useState<FishInfo>();

  const chooseComparedFish = (key: number) => {
    setIsOpen(true);
    setTargetFishId(key);
  };

  useEffect(() => {
    if (fishId) {
      console.log(`/api/fishes/${fishId}`);
      axiosInstance
        .get(`/api/fishes/${fishId}`)
        .then((res: AxiosResponse) => {
          setSourceFish(res.data.data);
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    }
  }, []);

  return (
    <Wrapper>
      <Header>
        <BackButton
          onClickBtn={() => {
            navigate(-1);
          }}
        ></BackButton>
        <span>어종검색</span>
        <div style={{ width: "7%" }}></div>
      </Header>
      {sourceFish && (
        <FishInfoCard
          id={sourceFish.fishId}
          name={sourceFish.name}
          description={sourceFish.description}
          otherPrice={sourceFish.otherPrice}
          ourPrice={sourceFish.ourPrice}
          imgUri={sourceFish.imgUri}
        />
      )}
      {sourceFish && sourceFish.similarFish.length !== 0 && (
        <div>
          <Warn>
            <WarnImg src={Warning} alt="" />
            <p>유사어종에 주의하세요</p>
          </Warn>
          <SimliarFishContainer>
            {sourceFish.similarFish.map((fish) => (
              <FishCompareCard
                fishId={fish.fishId}
                name={fish.name}
                imgUri={fish.imgUri}
                onClickCard={() => chooseComparedFish(fish.fishId)}
                key={fish.fishId}
              ></FishCompareCard>
            ))}
          </SimliarFishContainer>
          <Modal
            isOpen={isOpen}
            ariaHideApp={false}
            style={{
              overlay: {
                backgroundColor: "rgb(26,26,26,0.5)",
              },
              content: {
                width: "70%",
                display: "flex",
                flexDirection: "column",
                alignSelf: "center",
                justifySelf: "center",
                borderRadius: "10px",
                height: "400px",
                overflow: "auto",
                fontFamily: "Pretendard",
                padding: "5%",
              },
            }}
          >
            <ModalHeader setIsOpen={setIsOpen} />
            <ModalFishCompare
              sourceFishId={sourceFish.fishId}
              targetFishId={targetFishId}
            />
          </Modal>
        </div>
      )}
    </Wrapper>
  );
}
