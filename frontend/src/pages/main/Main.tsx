import React from 'react'
import styled from 'styled-components'

import Header from './components/Header';
import SeasonList from './components/SeasonList';
import MarketList from './components/MarketList';


const Wrapper = styled.div`
  width : 100%;
  height : auto;
  margin :0;
`

const MarginWrapper = styled.div`
    margin : 0% 5% 0% 5%;
    width : 90%;
`


export default function Main() {
    return (
        <Wrapper>
            <MarginWrapper>
                <Header></Header>
            </MarginWrapper>
            <MarketList></MarketList>
            <MarginWrapper>
                <SeasonList></SeasonList>
            </MarginWrapper>
        </Wrapper>
        
    )
}
