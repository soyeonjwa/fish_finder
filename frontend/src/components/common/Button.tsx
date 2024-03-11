import styled from 'styled-components';

type ButtonProps = {
    color : string;
    width : string;
    height : string;
    fontSize : string;
    backcolor : string;
    margin : string;
    padding : string;
    border : string;
}

export const Button = styled.button<ButtonProps>`
    width : ${props => props.width};
    height : ${props => props.height};
    border : ${props => props.border};
    color : ${props => props.color};
    font-size : ${props => props.fontSize};
    font-weight : bold;
    text-alight : center;
    padding : ${props => props.padding};
    margin : ${props => props.margin};
    cursor : pointer;
    backgroud-color : ${props => props.backcolor || '#FFFFFF'};
    border-radius : 10%;
`