import React from "react";
import styled from "styled-components";

type Props = {
  src: string;
  alt: string;
  width: string;
  height: string;
  onClick?(): void;
  objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down";
};

const Wrapper = styled.div<{ width: string; height: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

const Image = styled.img<{ objectFit?: string }>`
  height: 100%;
  width: 100%;
  object-fit: ${(props) => props.objectFit || "contain"};
  border-radius: 10px;
`;

export default function ImageContainer({
  src,
  alt,
  width,
  height,
  onClick,
  objectFit,
}: Props) {
  return (
    <Wrapper width={width} height={height} onClick={onClick}>
      <Image src={src} alt={alt} objectFit={objectFit}></Image>
    </Wrapper>
  );
}
