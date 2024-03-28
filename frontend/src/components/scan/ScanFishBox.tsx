import React from "react";
import styled from "styled-components";

interface ScanFishBoxProps {
  class?: string;
  class_name?: number;
  x?: number;
  y?: number;
  width: number;
  height: number;
  onClickScanBox(): void;
}

const Wrapper = styled.div`
  position: absolute;
  border: 5px solid white;
  z-index: 100;
`;

export default function ScanFishBox({
  class_name,
  x,
  y,
  width,
  height,
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
      <p>{class_name}</p>
    </Wrapper>
  );
}
