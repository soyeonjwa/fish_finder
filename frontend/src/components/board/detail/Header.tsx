import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import BackButton from "../../common/BackButton";
import IconButton from "../../common/IconButton";
import ExportIcon from "../../../assets/icons/export.svg";
import MenuIcon from "../../../assets/icons/dotsThree.svg";
import { axiosInstance } from "../../../services/axios";
import { AxiosResponse } from "axios";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  background-color: white;

  width: 90%;
  height: 60px;

  padding: 0 5% 0 5%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  & > div {
    width: 16%;
    margin: 5% 0 5% 0;

    display: flex;
    justify-content: space-between;
  }
`;

interface HeaderProps {
  boardId : number
}

export default function Header({boardId} : HeaderProps) {
  const navigate = useNavigate();

  const onClickBackBtn = () => {
    navigate('/board');
  };

  const onClickDeleteBtn = () => {
    axiosInstance.delete(`/api/board/${boardId}`)
      .then((res : AxiosResponse)=>{
        console.log(res.data.message);
        navigate(-1)
      })
      .catch(error => {throw new Error(error.message)})
  }

  return (
    <Wrapper>
      <BackButton onClickBtn={onClickBackBtn}></BackButton>
      <div>
        <IconButton width="45%" icon={ExportIcon}></IconButton>
        <IconButton width="45%" icon={MenuIcon} onClick = {onClickDeleteBtn}></IconButton>
      </div>
    </Wrapper>
  );
}
