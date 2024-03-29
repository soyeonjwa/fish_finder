import React from 'react'
import styled from 'styled-components'

import Header from '../../components/main/Header';
import SeasonList from '../../components/main/SeasonList';
import MarketList from '../../components/main/MarketList';
import PopularPosts from '../../components/main/PopularPosts';
import { NavBarWrapper } from '../../components/common/Wrapper';

const StyledWrapper = styled(NavBarWrapper)`
  width: 100%;
  margin: 0;
`;

export default function Main() {
    
    return (
        <StyledWrapper>
            <Header/>
            <MarketList/>
            <SeasonList/>
            <PopularPosts/>
        </StyledWrapper>
        
    )
}
