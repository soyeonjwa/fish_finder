import React from 'react'
import styled from 'styled-components'


type Props = {
  src : string,
  alt : string,
  width : string,
  height : string
}

const Wrapper = styled.div<{width: string, height: string}>`
  width : ${props => props.width };
  height : ${props => props.height};
`

const Image = styled.img`
  width : 100%;
  height : 100%;
  object-fit : cover;
  border-radius : 10%; 
`


export default function ImageContainer({src, alt, width, height} : Props) {
  return (
    <Wrapper width={width} height={height}>
      <Image src = {src} alt = {alt}></Image>
    </Wrapper>
  )
}
