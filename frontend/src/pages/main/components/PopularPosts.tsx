import React from 'react'
import styled from 'styled-components'
import PostContainer from './PostContainer'

const Wrapper = styled.div`
    margin : 4% 5% 0% 5%;
    width : 90%;

    font-family : Pretendard;
`

const Title = styled.div`
    margin-bottom : 3%;
    font-size : 18px;
    font-weight : bold;
`

export default function PopularPosts() {
  return (
    <Wrapper>
        <Title>인기글</Title>
        <PostContainer></PostContainer>
    </Wrapper>
  )
}
