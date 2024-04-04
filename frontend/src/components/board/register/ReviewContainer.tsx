import React, { useEffect } from "react";
import styled from "styled-components";


import { Button } from "../../common/Button";
import { gray1, gray2, gray3 } from "../../../assets/styles/palettes";
import IconButton from "../../common/IconButton";
import DeleteIcon from "../../../assets/icons/delete.svg";

import { reviewFormStore } from "../../../stores/reviewFormStore";

const Wrapper = styled.div`
  width: 100%;
  height: auto;

  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  width: 100%;
  height: auto;

  display: flex;
  flex-direction: column;
  margin-bottom: 3%;
`;

const StyledForm = styled.form`
  width: 100%;
  display: flex;
`;

const Input = styled.input`
  font-family: Pretendard;
  font-size: 15px;
  width: 94%;
  margin-top: 5px;
  border: 1px solid ${gray3};
  border-radius: 5px;
  height: 30px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin: 3% 1% 0% 1%;
  font-size: 13px;

  & > div {
    display: flex;
    flex-direction: row;
    position: relative;
  }
`;

const FishLabel = styled(Label)`
  width: 32%;
`;

const WeightLabel = styled(Label)`
  width: 25%;
`;

const PriceLabel = styled(Label)`
  width: 32%;
`;

const Unit = styled.div`
  color: ${gray2};
  position: absolute;
  top: 12px;
  right: 5%;
`;

const DeleteDiv = styled.div`
  width: 11%;
  display: flex;
  margin-top: 5%;
  justify-content: center;
  align-items: center;
`;


interface ReviewContainerProps {
  fishDatas : Map<string, number>
}


export default function ReviewContainer({fishDatas} : ReviewContainerProps) {

  const initialFormData : ReviewFormType = {
    id : 1,
    review : {
      name : "",
      pricePerKg : "",
      totalPrice : "",
      weight : ""
    }
  }

  const {reviewForms, setReviewForms} = reviewFormStore();

  const handleAddForm = () => {
    const newId = reviewForms[reviewForms.length-1].id +1;
    setReviewForms([...reviewForms, {...initialFormData, id : newId}])
  }

  const handleRemoveForm = (id : number) => {
    setReviewForms(reviewForms.filter(form => form.id !== id))
  }

  const handleFormFieldChange = (id : number, fieldName : string, value : string) => {
    if(fieldName === 'pricePerKg'){
      setReviewForms(reviewForms.map(form=> form.id ===id ? {...form, review : {...form.review, [fieldName] : value, 'totalPrice' : (parseFloat(value) * parseFloat(form.review.weight)).toString()}} : form))
    }
    else if(fieldName === 'weight'){
      setReviewForms(reviewForms.map(form=> form.id ===id ? {...form, review : {...form.review, [fieldName] : value, 'totalPrice' : (parseFloat(value) * parseFloat(form.review.pricePerKg)).toString()}} : form))
    }
    else if(fieldName === 'name'){
      setReviewForms(reviewForms.map(form=> form.id ===id ? {...form,review : {...form.review,  [fieldName] : value}} : form))
    }
  }

  useEffect(()=>{
    setReviewForms([initialFormData])
  },[])


  return (
    <Wrapper>
      <InputWrapper>
        {reviewForms.map((form) => (
          <StyledForm key={form.id}>
            <FishLabel htmlFor="fishId">
              {" "}
              {form.id === 1 ? "어종" : null}
              <Input type="text" list="list" id="name" value={form.review.name} onChange = {(e) => handleFormFieldChange(form.id, 'name', e.target.value)} />
              <datalist id="list">
                {
                  (fishDatas.size >=0) && (
                    Array.from(fishDatas.keys()).map((name) => (
                      <option key={name} value={name} />
                    ))
                  )
                    
                }
              </datalist>
            </FishLabel>
            <WeightLabel htmlFor="weight">
              {form.id === 1 ? "무게" : null}
              <div>
                <Input type="number" id="weight" step="0.01" value={form.review.weight} onChange = {(e)=> handleFormFieldChange(form.id, 'weight', e.target.value)}/>
                <Unit>kg</Unit>
              </div>
            </WeightLabel>
            <PriceLabel htmlFor="pricePerKg">
              {form.id === 1 ? "kg당 가격" : null}
              <div>
                <Input type="number" id="pricePerKg" step="0.01" value={form.review.pricePerKg} onChange = {(e) => handleFormFieldChange(form.id, 'pricePerKg', e.target.value)}/>
                <Unit>원</Unit>
              </div>
            </PriceLabel>
            {form.id !==1 ?
              <DeleteDiv onClick={() => handleRemoveForm(form.id)}>
                <IconButton width="70%" margin="0" icon={DeleteIcon} />
              </DeleteDiv> : <DeleteDiv></DeleteDiv>
            }
            
          </StyledForm>
        ))}
      </InputWrapper>
      <Button
        color={gray3}
        backcolor={gray1}
        width="100%"
        height="33px"
        margin="0 2% 0 0"
        border="0px"
        onClick={handleAddForm}
      >
        품목추가
      </Button>
    </Wrapper>
  );
}
