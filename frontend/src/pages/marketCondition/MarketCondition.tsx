import React, { useEffect, useState } from "react";

import { Wrapper } from "../../components/common/Wrapper";
import Header from "../../components/marketCondition/Header";
import PriceGraph from "../../components/marketCondition/PriceGraph";
import OtherPriceContainer from "../../components/marketCondition/OtherPriceContainer";
import OurPriceContainer from "../../components/marketCondition/OurPriceContainer";

import { AxiosResponse } from "axios";
import { axiosInstance } from "../../services/axios";
import { useParams } from "react-router-dom";

interface FishPriceList {
  fishId: number;
  name: string;
  imgUri: string;
  otherPrice: number;
  ourPrice: number;
  ourWeeklyPrice: Price[];
  ourMonthlyPrice: Price[];
  ourHalfYearPrice: Price[];
  otherWeeklyPrice: Price[];
  otherMonthlyPrice: Price[];
  otherHalfYearPrice: Price[];
}

export interface Price {
  date: string;
  price: number;
}

export default function MarketCondition() {
  const [data, setData] = useState<FishPriceList>();
  const { fishId } = useParams();

  useEffect(() => {
    axiosInstance
      .get(`/api/fishes/price?fishId=${fishId}`)
      .then((res: AxiosResponse) => {
        setData(res.data.data);
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }, []);

  return (
    <Wrapper>
      <Header />
      {data && (
        <>
          <PriceGraph
            ourWeeklyPrice={data.ourWeeklyPrice}
            ourMonthlyPrice={data.ourMonthlyPrice}
            ourHalfYearPrice={data.ourHalfYearPrice}
            otherWeeklyPrice={data.otherWeeklyPrice}
            otherMonthlyPrice={data.otherMonthlyPrice}
            otherHalfYearPrice={data.otherHalfYearPrice}
          />
          <OtherPriceContainer name={data.name} otherPrice={data.otherPrice} />
          <OurPriceContainer ourWeeklyPrice={data.ourWeeklyPrice} />
        </>
      )}
    </Wrapper>
  );
}
