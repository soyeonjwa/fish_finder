import React, { useState } from 'react'
import styled from 'styled-components'

import { Button } from '../../common/Button'
import { gray1, gray2, gray3 } from '../../../assets/styles/palettes'
import IconButton from '../../common/IconButton'
import DeleteIcon from '../../../assets/icons/delete.svg'

// interface Review{
//     fishId : number,
//     weight : number,
//     pricePerKg : number,
//     totalPrice : number
// }


const Wrapper = styled.div`
    width: 100%;
    height: auto;

    display: flex;
    flex-direction: column;
`

const InputWrapper = styled.div`
    width: 100%;
    height: auto;

    display : flex;
    flex-direction: column;
    margin-bottom: 3%;
`

const StyledForm = styled.form`
    width: 100%;
    display : flex;
`

const Input = styled.input`
    font-family: Pretendard;
    font-size : 15px;
    width : 94%;
    margin-top : 5px;
    border : 1px solid ${gray3};
    border-radius : 5px;
    height: 30px;
`

const Label = styled.label`
    display : flex;
    flex-direction: column;
    margin : 3% 1% 0% 1%;
    font-size: 13px;

    & > div{
        display: flex;
        flex-direction: row;
        position : relative;
    }
`

const FishLabel = styled(Label)`
    width : 32%;
`

const WeightLabel = styled(Label)`
    width : 25%;
`

const PriceLabel = styled(Label)`
    width : 32%;
`

const Unit = styled.div`
    color : ${gray2};
    position : absolute;
    top : 12px;
    right : 5%;
`

const DeleteDiv = styled.div`
    width : 11%;
    display: flex;
    margin-top: 5%;
    justify-content: center;
    align-items: center;
`

export default function ReviewContainer() {
    const [size, setSize] = useState(1);
    const [forms, setForms] = useState<number[]>([0]);
    // const [reviews, setReviews] = useState<Review[]>([]);
    
    const onClickAddBtn = () => {
        setForms(forms => [...forms, size])
        setSize(size+1);
    }

    const onClickDeleteBtn = (key : number) => {
        setForms(forms.filter(formIndex => formIndex !== key))
    }

    return (
        <Wrapper>
            <InputWrapper>
                {forms.map((formIndex)=>(
                    <StyledForm key = {formIndex}> 
                        <FishLabel htmlFor = 'fishId'> {(formIndex===0)?'어종':null}
                            <Input type='text' list = 'list' id = 'fishId'/>
                            <datalist id = 'list'>
                                <option value = '뱅어돔'></option>
                                <option value = '강담돔'></option>
                                <option value = '옥돔'></option>
                                <option value = '방어'></option>
                            </datalist>
                        </FishLabel>
                        <WeightLabel htmlFor = 'weight'>{(formIndex===0)?'무게':null}
                            <div>
                                <Input type ='number' id='weight'/>
                                <Unit>kg</Unit>
                            </div>
                        </WeightLabel>
                        <PriceLabel htmlFor = 'pricePerKg'>{(formIndex===0)?'kg당 가격':null}
                            <div>
                                <Input type='number' id='pricePerKg'/>
                                <Unit>원</Unit>
                            </div>
                        </PriceLabel>
                        <DeleteDiv onClick={() => onClickDeleteBtn(formIndex)}>
                            {
                                (formIndex!==0)?
                                    <IconButton
                                    width = '70%'
                                    margin = '0'
                                    icon = {DeleteIcon}
                                    />
                                    :<></>
                            }
                        </DeleteDiv> 
                    </StyledForm>
                ))}
            </InputWrapper>
            <Button
                color = {gray3}
                backcolor= {gray1}
                width = '100%'
                height='33px'
                margin = '0 2% 0 0'
                border = '0px'
                onClick = {onClickAddBtn}
            >품목추가</Button>         
        </Wrapper>
    )
}
