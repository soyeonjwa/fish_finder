import React from 'react'
import styled from 'styled-components'

import Header from '../../components/main/Header';
import SeasonList from '../../components/main/SeasonList';
import MarketList from '../../components/main/MarketList';
import PopularPosts from '../../components/main/PopularPosts';


const Wrapper = styled.div`
  width : 100%;
  height : auto;
  margin :0;
`


export default function Main() {
    return (
        <Wrapper>
            <Header/>
            <MarketList/>
            <SeasonList/>
            <PopularPosts/>
        </Wrapper>
        
    )
}
