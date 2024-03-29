import React from "react";
import styled from "styled-components";

interface ScanFishBoxProps {
  class?: number;
  class_name?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  confidence?: number | string;
  onClickScanBox(): void;
}

const Wrapper = styled.div`
  position: absolute;
  border: 3px solid white;
  border-radius: 10px;
  z-index: 100;
`;

const ScanFishNameBox = styled.div`
  position: absolute;
  background-color: white;
  border-radius: 5px;
  padding: 5px;
  font-size: 15px;
  z-index: 100;
  top: 0;
  left: 0;
  transform: translate(0, -50%);
`;

export default function ScanFishBox({
  class_name,
  x,
  y,
  width,
  height,
  confidence,
  onClickScanBox,
}: ScanFishBoxProps) {
  return (
    <Wrapper
      style={{
        left: x,
        top: y,
        width: width,
        height: height,
      }}
      onClick={onClickScanBox}
    >
      <ScanFishNameBox>
        <span>{class_name} </span>
        <span>{confidence}%</span>
      </ScanFishNameBox>
    </Wrapper>
  );
}
