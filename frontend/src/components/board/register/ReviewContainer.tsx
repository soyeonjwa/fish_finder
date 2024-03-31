import React, { useEffect, useState } from "react";
import styled from "styled-components";

import usePostStore from "../../../stores/postStore";

import { Button } from "../../common/Button";
import { gray1, gray2, gray3 } from "../../../assets/styles/palettes";
import IconButton from "../../common/IconButton";
import DeleteIcon from "../../../assets/icons/delete.svg";

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

interface ReviewForm{
  id : number
  review : Review
}


export default function ReviewContainer() {
  const initialFormData : ReviewForm = {
    id : 1,
    review : {
      fishId : 0,
      pricePerKg : 0,
      totalPrice : 0,
      weight : 0
    }
  }

  const [forms, setForms] = useState<ReviewForm[]>([initialFormData]);
  const { setReviews } = usePostStore();

  const handleAddForm = () => {
    const newId = forms[forms.length-1].id +1;
    setForms([...forms, {...initialFormData, id : newId}])
  }

  const handleRemoveForm = (id : number) => {
    setForms(forms.filter(form => form.id !== id))
  }

  const handleFormFieldChange = (id : number, fieldName : string, value : string) => {
    if(fieldName === 'pricePerKg'){
      setForms(forms.map(form=> form.id ===id ? {...form, review : {...form.review, [fieldName] : parseInt(value), 'totalPrice' : parseInt(value) * form.review.weight}} : form))
    }
    else if(fieldName === 'weight'){
      setForms(forms.map(form=> form.id ===id ? {...form, review : {...form.review, [fieldName] : parseInt(value), 'totalPrice' : parseInt(value) * form.review.pricePerKg}} : form))
    }
    else{
      setForms(forms.map(form=> form.id ===id ? {...form,review : {...form.review,  [fieldName] : parseInt(value)}} : form))
    }
  }

  useEffect(()=>{
    setReviews(forms.map(form => form.review))
  }, [forms])

  return (
    <Wrapper>
      <InputWrapper>
        {forms.map((form) => (
          <StyledForm key={form.id}>
            <FishLabel htmlFor="fishId">
              {" "}
              {form.id === 1 ? "어종" : null}
              <Input type="number" list="list" id="fishId" value={form.review.fishId} onChange = {(e) => handleFormFieldChange(form.id, 'fishId', e.target.value)}/>
              <datalist id="list">
                <option value={1}></option>
                <option value={2}></option>
                <option value={3}></option>
                <option value={4}></option>
              </datalist>
            </FishLabel>
            <WeightLabel htmlFor="weight">
              {form.id === 1 ? "무게" : null}
              <div>
                <Input type="number" id="weight" value={form.review.weight} onChange = {(e)=> handleFormFieldChange(form.id, 'weight', e.target.value)}/>
                <Unit>kg</Unit>
              </div>
            </WeightLabel>
            <PriceLabel htmlFor="pricePerKg">
              {form.id === 1 ? "kg당 가격" : null}
              <div>
                <Input type="number" id="pricePerKg" value={form.review.pricePerKg} onChange = {(e) => handleFormFieldChange(form.id, 'pricePerKg', e.target.value)}/>
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
