import React from 'react'
import styled from 'styled-components'
import ImageContainer from '../../common/ImageContainer'
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css'
import "slick-carousel/slick/slick-theme.css";

interface MidContentProps{
    content : string;
    thumbnail : image[];
}

interface image{
  imageId : number,
  imageUri : string
}

const Wrapper = styled.div`
  width : 100%;
  height : auto;
  margin-bottom : 6%;
`

const settings = {
    dots : true,
    infinite : false,
    speed : 500,
    slidesToShow : 1,
    slidesToScroll : 1,
    autoplay : false,
    arrows: false, 
    appendDots: (dots: boolean) => (
        <div
          style={{
            width : '90%',
            position: 'absolute',
            bottom: '1%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ul> {dots} </ul>
        </div>
      ),
  
  }

export default function MidContent({content, thumbnail} : MidContentProps) {
  return (
    <Wrapper>
        <div style={{fontSize:'16px', marginBottom : '2%'}}>{content}</div>
          <Slider {...settings}>
            {thumbnail && thumbnail.map((image)=>(
              <div key = {image.imageId}>
                <ImageContainer
                  src = {image.imageUri}
                  alt = "썸네일"
                  width = '100%'
                  height = '300px'
                ></ImageContainer>
              </div>
            ))}
          </Slider>
    </Wrapper>
  )
}
