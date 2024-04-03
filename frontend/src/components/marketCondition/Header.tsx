import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import BackButton from '../common/BackButton'

const Wrapper = styled.div`
    height : 60px;
    width : 100%;
    display : flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    & > span {
    font-size: 18px;
    font-weight: bold;
  }

  & > div{
    width : 7%;
  }
`

export default function Header() {
  const navigate = useNavigate();

  return (
    <Wrapper>
        <BackButton
            onClickBtn={()=>{navigate(-1);}}
        />
        <span>어종시세</span>
        <div></div>
    </Wrapper>
  )
}
