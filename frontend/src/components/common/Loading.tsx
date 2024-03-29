import React from "react";
import styled from "styled-components";
import Spinner from "../../assets/icons/Spinner.gif";

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #ffffffb7;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function Loading() {
  return (
    <Background>
      <img src={Spinner} alt="로딩중" width="60%" />
    </Background>
  );
}
