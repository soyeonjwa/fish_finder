import React from 'react'
import styled from 'styled-components'

import Title from './Title'
import ContentIcon from '../../../assets/icons/content.svg'

const Wrapper = styled.div`
    width: 100%;
    height: auto;
`

const Content = styled.textarea`
    font-size: 15px;
    font-family: Pretendard;
    margin : 3% 0% 4% 0%;
    width: 100%;
    border : 0;
`

export default function ContentContainer() {
  return (
    <Wrapper>
        <Title icon = {ContentIcon} name = "내용"/>
        <Content
            name = 'content'
            placeholder='내용을 입력해주세요.'
            rows = {10}
        ></Content>
    </Wrapper>
  )
}
