import React from 'react'

import { Wrapper } from '../../components/common/Wrapper'
import Header from '../../components/marketCondition/Header'
import PriceGraph from '../../components/marketCondition/PriceGraph'

import data from '../../services/dummy/fishPrice.json';
import OtherPriceContainer from '../../components/marketCondition/OtherPriceContainer';
import OurPriceContainer from '../../components/marketCondition/OurPriceContainer';

export default function MarketCondition() {
  return (
    <Wrapper>
      <Header/>
      <PriceGraph fishId = {data.fishId}/>
      <OtherPriceContainer otherPrice={data.otherPrice}/>
      <OurPriceContainer ourWeeklyPrice={data.ourWeeklyPrice}/>
    </Wrapper>
  )
}
