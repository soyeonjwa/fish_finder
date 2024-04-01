import React from "react";
import styled from "styled-components";

type Props = {
  src: string;
  alt: string;
  width: string;
  height: string;
  onClick?(): void;
};

const Wrapper = styled.div<{ width: string; height: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
  border-radius: 10px;
`;

export default function ImageContainer({
  src,
  alt,
  width,
  height,
  onClick,
}: Props) {
  return (
    <Wrapper width={width} height={height} onClick={onClick}>
      <Image src={src} alt={alt}></Image>
    </Wrapper>
  );
}
