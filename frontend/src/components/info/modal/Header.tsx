import React from 'react'
import styled from 'styled-components'


import IconButton from '../../common/IconButton'
import CloseButton from '../../../assets/icons/close.svg'

interface HeaderProps{
  setIsOpen : (isOpen : boolean) => void;
}


const Wrapper = styled.div`
    display: flex;
    flex-direction : row;
    justify-content : space-between;
    padding-bottom: 15px;
`

const Title = styled.div`
    font-size : 18px;
`

export default function Header({setIsOpen} : HeaderProps) {
  return (
    <Wrapper>
        <div style = {{width : '10%'}}></div>
        <Title>유사 어종 비교</Title>
        <div onClick={() => setIsOpen(false)}>
          <IconButton
              icon = {CloseButton}
              width = '100%'
              margin = '0'
          />
        </div>
    </Wrapper>
  )
}
