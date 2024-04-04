import React from "react";
import FooterSvgIcon from "../../assets/icons/footer.svg";

interface FooterSvgProps {
  id: string;
  size?: number | string;
  fill?: string;
}

export default function FooterSvg({
  id,
  size,
  fill = "white",
}: FooterSvgProps) {
  return (
    <>
      <svg fill={fill} width={size} height={size}>
        <use href={`${FooterSvgIcon}#${id}`} />
      </svg>
    </>
  );
}
