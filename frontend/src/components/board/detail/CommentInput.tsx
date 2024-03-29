import React, { useState } from 'react'
import styled from 'styled-components'

import {  gray3, gray1 } from '../../../assets/styles/palettes'
import CommentAdd from '../../../assets/icons/commentAdd.svg';
import { axiosInstance } from '../../../services/axios';
import { AxiosResponse } from 'axios';
import { userStore } from '../../../stores/userStore';

interface CommentInputProps{
    boardId : string | undefined
}

const Wrapper = styled.div`
    border-top : 1px solid ${gray3};
    position : fixed;
    bottom : 0;
    left : 0;
    background-color: white;
    width: 100%;
    height : 55px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Form = styled.form`
    position : relative;
    width: 90%;
`

const Input = styled.input`
    font-family: Pretendard;
    font-size: 15px;
    width : 97%;
    height: 30px;
    margin : 0;
    border : 0;
    background-color: ${gray1};
    border-radius: 10px;
    padding-left : 3%;
`
const Image = styled.img`
    width: 100%;
    padding : 0;
`

const Button = styled.button`
    width: 12%;
    position : absolute;
    right : 3%;
    top : 5%;
    border: 0;
    background-color: transparent;
`

export default function CommentInput({boardId}:CommentInputProps) {
    const [value, setValue] = useState<string>("")

    const onSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axiosInstance.post(`/api/board/comment/${boardId}`,
                {
                    content : value
                }
            )
            .then((res : AxiosResponse)=>{console.log(res.data)})
            .catch(error => {throw new Error(error.message)})
    }
    
    return (
        <Wrapper>
            <Form onSubmit={onSubmit}>
                <Input placeholder='댓글을 입력해주세요.' name = "userComment"value = {value} onChange={e=> setValue(e.target.value)}></Input>
                <Button>
                    <Image
                        src = {CommentAdd}
                    ></Image>
                </Button>
            </Form>
        </Wrapper>
    )
}
