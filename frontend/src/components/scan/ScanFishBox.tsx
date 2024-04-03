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
  position?: number;
}

const Wrapper = styled.div`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.2);
  border: 3px solid white;
  border-radius: 10px;
  z-index: 100;
`;

const ScanFishNameBox1 = styled.div`
  position: absolute;
  background-color: white;
  padding: 5px;
  font-size: 15px;
  z-index: 1000;
  top: 0;
  left: 0;
  transform: translate(0, -100%);
`;

const ScanFishNameBox2 = styled.div`
  position: absolute;
  background-color: white;
  padding: 5px;
  font-size: 15px;
  z-index: 1000;
  top: 0;
  left: 0;
  transform: translate(0, 0);
`;

export default function ScanFishBox({
  class_name,
  x,
  y = 0,
  width,
  height = 0,
  confidence,
  onClickScanBox,
  position,
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
      {position === -1 ? (
        <ScanFishNameBox1>
          <span>{class_name} </span>
          <span>{confidence}%</span>
        </ScanFishNameBox1>
      ) : (
        <ScanFishNameBox2
          style={{
            top: height,
          }}
        >
          <span>{class_name} </span>
          <span>{confidence}%</span>
        </ScanFishNameBox2>
      )}
    </Wrapper>
  );
}
