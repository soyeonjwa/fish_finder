import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
} from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Legend);

import { gray2, gray3, gray4, primary } from "../../assets/styles/palettes";
import { Button } from "../common/Button";

interface PriceGraphProps {
  name: string;
  ourWeeklyPrice: Price[];
  ourMonthlyPrice: Price[];
  ourHalfYearPrice: Price[];
  otherWeeklyPrice: Price[];
  otherMonthlyPrice: Price[];
  otherHalfYearPrice: Price[];
}

interface Price {
  date: string;
  price: number;
}

interface PriceData {
  x: string;
  y: number;
}

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  border: 1px solid ${gray3};
  border-radius: 10px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${primary};
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 2%;
`;

const ChartWrapper = styled.div`
  width: 90%;
  height: auto;
  margin: 8% 5% 2% 5%;
`;

const LegendDiv = styled.div`
  width: 50%;
  margin-left: 25%;
  margin-bottom: 5%;
  display: flex;
  flex-direction: row;
  align-items: center;

  & > div {
    font-size: 13px;
    color: ${gray4};
  }
`;

const OrangeHr = styled.hr`
  width: 10%;
  background: orange;
  height: 3px;
  border: 0;
  padding: 0;
`;

const PrimaryHr = styled.hr`
  width: 10%;
  background: ${primary};
  height: 3px;
  border: 0;
`;

const options = {
  responsive: true,
  scales: {
    y: {
      ticks: {
        color: `${gray2}`,
      },
      // suggestedMin : 0
    },
    x: {
      ticks: { color: `${gray2}` },
      grid: {
        color: "transparent",
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

export default function PriceGraph({
  ourWeeklyPrice,
  ourMonthlyPrice,
  ourHalfYearPrice,
  otherWeeklyPrice,
  otherMonthlyPrice,
  otherHalfYearPrice,
  name,
}: PriceGraphProps) {
  const [selectedBtn, setSelectedBtn] = useState("oneWeek");
  const [priceDatas, setPriceDatas] = useState<PriceData[]>([]);
  const [otherPriceDatas, setOtherPriceDatas] = useState<PriceData[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  const data = {
    labels,
    datasets: [
      {
        label: "물어바종", //그래프 분류되는 항목
        data: priceDatas,
        borderColor: primary, //그래프 선 color
        pointBorderColor: `transparent`,
      },
      {
        label: "타사이트",
        data: otherPriceDatas,
        borderColor: "orange", //그래프 선 color
        pointBorderColor: `transparent`,
      },
    ],
  };

  useEffect(() => {
    setLabels([]);

    if (selectedBtn === "oneWeek") {
      setPriceDatas(
        ourWeeklyPrice.map((entry) => ({
          x: entry.date.split("-")[2] + "일",
          y: entry.price,
        }))
      );
      setOtherPriceDatas(
        otherWeeklyPrice.map((entry) => ({
          x: entry.date.split("-")[2] + "일",
          y: entry.price,
        }))
      );
    } else if (selectedBtn === "oneMonth") {
      setPriceDatas(
        ourMonthlyPrice.map((entry) => ({
          x: entry.date[4] + entry.date[5] + "주",
          y: entry.price,
        }))
      );
      setOtherPriceDatas(
        otherMonthlyPrice.map((entry) => ({
          x: entry.date[4] + entry.date[5] + "주",
          y: entry.price,
        }))
      );
    } else if (selectedBtn === "sixMonth") {
      setPriceDatas(
        ourHalfYearPrice.map((entry) => ({
          x: entry.date.split("-")[1] + "월",
          y: entry.price,
        }))
      );
      setOtherPriceDatas(
        otherHalfYearPrice.map((entry) => ({
          x: entry.date.split("-")[1] + "월",
          y: entry.price,
        }))
      );
    }
  }, [selectedBtn]);

  useEffect(() => {}, []);

  return (
    <Wrapper>
      <Title>{name}</Title>
      <Buttons>
        <Button
          color={selectedBtn === "oneWeek" ? "white" : gray2}
          backcolor={selectedBtn === "oneWeek" ? primary : "white"}
          border={selectedBtn === "oneWeek" ? "0" : `2px solid ${gray2}`}
          width="25%"
          height="auto"
          fontSize="14px"
          margin="0"
          padding="1% 0 1% 0"
          fontWeight={500}
          onClick={() => {
            setSelectedBtn("oneWeek");
          }}
        >
          1주일
        </Button>
        <Button
          color={selectedBtn === "oneMonth" ? "white" : gray2}
          backcolor={selectedBtn === "oneMonth" ? primary : "white"}
          border={selectedBtn === "oneMonth" ? "0" : `2px solid ${gray2}`}
          width="25%"
          height="auto"
          fontSize="14px"
          margin="0"
          padding="1% 0 1% 0"
          fontWeight={500}
          onClick={() => {
            setSelectedBtn("oneMonth");
          }}
        >
          1달
        </Button>
        <Button
          color={selectedBtn === "sixMonth" ? "white" : gray2}
          backcolor={selectedBtn === "sixMonth" ? primary : "white"}
          border={selectedBtn === "sixMonth" ? "0" : `2px solid ${gray2}`}
          width="25%"
          height="auto"
          fontSize="14px"
          margin="0"
          padding="1% 0 1% 0"
          fontWeight={500}
          onClick={() => {
            setSelectedBtn("sixMonth");
          }}
        >
          6개월
        </Button>
      </Buttons>
      <ChartWrapper>
        <Line options={options} data={data}></Line>
      </ChartWrapper>
      <LegendDiv>
        <PrimaryHr></PrimaryHr>
        <div>물어바종</div>
        <OrangeHr></OrangeHr>
        <div>타사이트</div>
      </LegendDiv>
    </Wrapper>
  );
}
