import React from 'react'
import styled from 'styled-components'

import BackIcon from '../../assets/icons/back.svg';
import { Button } from './Button'


interface BackButtonProps{
  onClickBtn() : void;
}

const Icon = styled.img`
  width: 100%;
`

export default function BackButton({onClickBtn}: BackButtonProps) {

  return (
        <Button 
          onClick = {onClickBtn}
          width = '7%'
          height = 'auto'
          backcolor='transparent'
          border = '0px'
          margin = '3% 0 3% 0'  
          padding = '0px'        
        >
          <Icon src = {BackIcon}/>
        </Button>
  )
}
