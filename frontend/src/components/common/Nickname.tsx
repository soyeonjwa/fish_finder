import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { Button } from "./Button";
import { primary, black, gray3 } from "../../assets/styles/palettes";
import { userStore } from "../../stores/userStore";

import { axiosInstance } from "../../services/axios";
import { AxiosResponse } from "axios";

import valueDelete from "../../assets/icons/valueDelete.svg";

const Wrapper = styled.div`
  margin: 0% 5% 0% 5%;
  width: 90%;
  height: 80vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 90%;
  height: 70px;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  z-index: 10;
`;

const Contents = styled.div`
  margin: 0% 5% 0% 5%;
  height: 100%;
  padding-top: 70px;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  font-size: 18px;
  color: ${black};
  margin-top: 5%;
  margin-bottom: 15%;
  & > p {
    margin: 0px 0;
    font-weight: 600;
  }
`;
const InputWrapper = styled.div`
  position: relative;
  height: auto;
  width: 100%;
  margin-bottom: 20px;
`;

const Input = styled.input<{ hasValue: boolean }>`
  font-family: Pretendard;
  width: 100%;
  font-size: 18px;
  height: 40px;
  margin-top: 50px;
  margin-bottom: 50px;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom-color: ${(props) => (props.hasValue ? primary : gray3)};
  border-bottom-width: 1px;

  &:focus {
    outline: none;
  }
`;

const DeleteButton = styled.img`
  position: absolute;
  right: 1%;
  top: 46%;
`;

const SubmitButton = styled(Button)<{ hasValue: boolean }>`
  background-color: ${(props) => (props.hasValue ? primary : gray3)};
  border: none;
`;

interface NickNameProps {
  title: string;
  url: string;
}

export default function NickName({ title, url }: NickNameProps) {
  const { nickname, setNickName } = userStore();
  const navigate = useNavigate();

  const onSubmit = () => {
    axiosInstance
      .put("/api/users/update", {
        nickname
      })
      .then((res: AxiosResponse) => {
        console.log(res.data.message);
        navigate(url);
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setNickName(e.currentTarget.value);
  };
  const hasValue = nickname.trim() !== "";
  return (
    <Wrapper>
      <Header></Header>
      <Contents>
        <Content>
          <p>닉네임을 입력해주세요</p>
        </Content>
        <InputWrapper>
          <Input
            hasValue={hasValue}
            placeholder="닉네임 입력"
            value={nickname}
            onChange={onChange}
          ></Input>
          {hasValue && (
            <DeleteButton
              src={valueDelete}
              alt="값 삭제 버튼"
              onClick={() => setNickName("")}
            />
          )}
        </InputWrapper>
        <SubmitButton
          hasValue={hasValue}
          width="100%"
          height="50px"
          color="white"
          backcolor={primary}
          border="1px solid #00116A"
          fontSize="18px"
          padding="2% 4% 2% 4%"
          margin="0% 4% 2% 0%"
          onClick={onSubmit}
          disabled={!hasValue}
        >
          {title}
        </SubmitButton>
      </Contents>
    </Wrapper>
  );
}
