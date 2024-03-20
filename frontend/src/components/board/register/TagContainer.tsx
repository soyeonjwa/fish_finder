import React, { useState } from 'react'
import styled from 'styled-components'

import Title from './Title'
import { Button } from '../../common/Button';
import TagIcon from '../../../assets/icons/tag.svg';
import { gray1, gray3, primary } from '../../../assets/styles/palettes';
import ReviewContainer from './ReviewContainer';

const Wrapper = styled.div`
    width: 100%;
    height: auto;
`

const ButtonWrapper = styled.div`
    width : 100%;
    margin-top : 4%;
    margin-bottom: 4%;
`


export default function TagContainer() {
    const [selectedBtn, setSelectedBtn] = useState("origin");

    const onClickBtn = () => {
        if(selectedBtn==="origin") setSelectedBtn("review");
        else setSelectedBtn("origin");
    }

    return (
        <Wrapper>
            <Title icon = {TagIcon} name = "태그"/>
            <ButtonWrapper>
                <Button
                    color = {(selectedBtn==="origin")? 'white' : gray3}
                    backcolor= {(selectedBtn==="origin")? primary : gray1}
                    width = '49%'
                    height='33px'
                    margin = '0 2% 0 0'
                    border = '0px'
                    onClick={onClickBtn}
                >일반</Button>
                <Button
                    color = {(selectedBtn==="review")? 'white' : gray3}
                    backcolor= {(selectedBtn==="review")? primary : gray1}
                    width = '49%'
                    height='35px'
                    margin = '0'
                    border = '0px'
                    onClick={onClickBtn}
                >리뷰</Button>
            </ButtonWrapper>
            
            {
                (selectedBtn==="review")?
                <ReviewContainer/> : <></>
            }
        </Wrapper>
    )
}
