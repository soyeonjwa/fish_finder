import styled from "styled-components";

export const Modal = styled.div`
  font-family: Pretendard;
  position: fixed;
  width: 100%;
  background-color: white;
  z-index: 1000;

  margin-bottom: 72px;
  @media only screen and (max-width: 300px) {
    margin-bottom: 60px;
  }

  @media only screen and (min-width: 400px) {
    margin-bottom: 80px;
  }

  @media only screen and (min-width: 430px) {
    margin-bottom: 90px;
  }

  @media only screen and (min-width: 500px) {
    margin-bottom: 100px;
  }
`;
//height @media 해줘야 됨
