import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import BackButton from "../../common/BackButton";
import IconButton from "../../common/IconButton";
import TrashIcon from "../../../assets/icons/trash.svg";
import ExportIcon from "../../../assets/icons/export.svg";
// import MenuIcon from "../../../assets/icons/dotsThree.svg";
import { axiosInstance } from "../../../services/axios";
import { AxiosResponse } from "axios";
import { userStore } from "../../../stores/userStore";

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
    width: 15%;
    margin: 5% 0 5% 0;

    display: flex;
    justify-content: space-between;
  }
`;

interface HeaderProps {
  boardId : number,
  writerId : number
}


export default function Header({boardId, writerId} : HeaderProps) {
  const navigate = useNavigate();
  const {userId} = userStore();

  const onClickBackBtn = () => {
    navigate("/board");
  };

  const onClickDeleteBtn = () => {
    axiosInstance
      .delete(`/api/board/${boardId}`)
      .then((res: AxiosResponse) => {
        console.log(res.data.message);
        alert("게시물 삭제에 성공했습니다.")
        navigate(-1);
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  };

  return (
    <Wrapper>
      <BackButton onClickBtn={onClickBackBtn}></BackButton>
      <div>
        {
          (writerId === userId) ? (
            <IconButton width="45%" icon={TrashIcon} onClick = {onClickDeleteBtn}></IconButton>
          ):
          (
            <div style={{width : '45%'}}></div>
          )
        }
        <IconButton width="45%" icon={ExportIcon}></IconButton>
      </div>
    </Wrapper>
  );
}
