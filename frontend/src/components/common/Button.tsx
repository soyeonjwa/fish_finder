import styled from "styled-components";

import { gray2 } from "../../assets/styles/palettes";

type ButtonProps = {
  color?: string;
  width: string;
  height: string;
  fontSize?: string;
  fontWeight?: string | number;
  backcolor?: string;
  margin: string;
  padding?: string;
  border?: string;
  cursor?: string;
};

export const Button = styled.button<ButtonProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: ${(props) => props.border || `2px solid ${gray2}`};
  color: ${(props) => props.color || `${gray2}`};
  font-family: Pretendard;
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight || "bold"};
  text-align: center;
  padding: ${(props) => props.padding || "1% 4% 1% 4%"};
  margin: ${(props) => props.margin};
  cursor: ${(props) => props.cursor || "pointer"};
  background-color: ${(props) => props.backcolor || "white"};
  border-radius: 5px;
`;
