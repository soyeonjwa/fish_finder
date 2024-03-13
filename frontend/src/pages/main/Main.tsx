import React from 'react'
import styled from 'styled-components'

import Header from './components/Header';
import SeasonList from './components/SeasonList';
import MarketList from './components/MarketList';
import PopularPosts from './components/PopularPosts';


const Wrapper = styled.div`
  width : 100%;
  height : auto;
  margin :0;
`



export default function Main() {
    return (
        <Wrapper>
            <Header></Header>

            <MarketList></MarketList>
            <SeasonList></SeasonList>
            <PopularPosts></PopularPosts>
            
        </Wrapper>
        
    )
}
