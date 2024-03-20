import React from 'react'
import styled from 'styled-components';


import {gray2} from '../../assets/styles/palettes';
import searchIcon from '../../assets/icons/search.svg';

type SearchBoxProps = {
    width : string,
    name : string,
    margin : string,
    value : string,
    setValue(value : string) : void,
    handleSubmit() : void,
}


const Outline = styled.div<{width: string, margin : string}>`
    border : 1px solid;
    border-color : ${gray2};
    border-radius : 5px;
    height : auto;
    width : ${props => props.width};
    display : flex;
    flex-direction : row;
    margin : ${props => props.margin};

    & > img{
        padding : 1%;
    }

    & > form{
        padding : 1%;
        width : 100%;

        display : flex;
        flex-direction: row;
        align-items: center;

        & > input{
            border : none;
            width : 99%;
            font-family : Pretendard;
            font-size : 14px;

            &:focus {
                outline: none;
              }
        }
    }
`


export default function SearchBox({width, margin, name,value, setValue, handleSubmit} : SearchBoxProps) {
  return (
    <Outline width={width} margin = {margin}>
        <img src = {searchIcon}></img>
        <form onSubmit={handleSubmit}>
            <input name = {name} placeholder='검색어를 입력해주세요.' value = {value} onChange = {e=> setValue(e.target.value)}></input>
        </form>
    </Outline>
  )
}
