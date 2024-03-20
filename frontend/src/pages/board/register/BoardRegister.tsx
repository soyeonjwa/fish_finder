import React from 'react'
import styled from 'styled-components'

import { Wrapper } from '../../../components/common/Wrapper'
import Header from '../../../components/board/register/Header'
import TagContainer from '../../../components/board/register/TagContainer'
import ImageContainer from '../../../components/board/register/ImageContainer'
import { gray3 } from '../../../assets/styles/palettes'
import TitleContainer from '../../../components/board/register/TitleContainer'
import ContentContainer from '../../../components/board/register/ContentContainer'

const StyledWrapper = styled(Wrapper)`
  display : flex;
  flex-direction : column;

  padding-bottom : 40px;
`

const Contents = styled.div`
  width : 100%;
  height : auto;

  padding-top : 60px;
`

const Hr = styled.hr`
  background-color: ${gray3};
  height : 0.5px;
  border : 0;
`

export default function BoardRegister() {
  return (
    <StyledWrapper>
      <Header/>
      <Contents>
        <TagContainer/>
        <Hr/>
        <ImageContainer/>
        <Hr/>
        <TitleContainer/>
        <Hr/>
        <ContentContainer/>
      </Contents>
    </StyledWrapper>
  )
}
