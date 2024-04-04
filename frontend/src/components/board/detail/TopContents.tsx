import React from "react";
import styled from "styled-components";

import { Button } from "../../common/Button";
import { gray4, primary } from "../../../assets/styles/palettes";
import { formatCreatedAt } from "../../common/FormatCreatedAt";

interface TopContentProps {
  postType: string;
  title: string;
  writer: string;
  createdAt: string;
}

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 6%;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin: 2% 0 2% 0;
`;

const NameTimeContent = styled.div`
  width: 100%;
  height: auto;
  font-size: 15px;
  color: ${gray4};
`;

export default function TopContents({
  postType,
  title,
  writer,
  createdAt,
}: TopContentProps) {
  return (
    <Wrapper>
      {postType == "review" && (
        <Button
          width="auto"
          height="auto"
          color={primary}
          border="1px solid #00116A"
          fontSize="16px"
          padding="2% 4% 2% 4%"
          margin="0% 4% 2% 0%"
          backcolor="white"
          disabled={true}
        >
          리뷰
        </Button>
      )}
      <Title>{title}</Title>
      <NameTimeContent>
        {" "}
        {writer} &nbsp; {formatCreatedAt(createdAt)}
      </NameTimeContent>
    </Wrapper>
  );
}
