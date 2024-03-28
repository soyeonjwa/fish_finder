import React from 'react'
import styled from 'styled-components'

import { Button } from './Button'

interface IconButtonProps{
    width : string;
    margin? : string;
    icon : string;
    onClick? : () => void;
}

const Icon = styled.img`
  width: 100%;
`

export default function IconButton({width, margin, icon, onClick}: IconButtonProps) {
  return (
        <Button
          width = {width}
          height = 'auto'
          backcolor='transparent'
          border = '0px'
          margin = {margin? margin : '5% 0 5% 0'}
          padding = '0px'        
          onClick={onClick}
        >
          <Icon src = {icon}/>
        </Button>
  )
}
