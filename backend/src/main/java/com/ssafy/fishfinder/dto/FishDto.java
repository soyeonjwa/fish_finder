package com.ssafy.fishfinder.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class FishDto {

    @Getter @Setter
    @Builder
    public static class FishListResponseDto{
        private Long fishId;
        private String name;
        private String imgUri;
        private String description;
    }

    @Getter @Setter
    @Builder
    public static class FishDetailResponseDto{
        private Long fishId;
        private String name;
        private String imgUri;
        private String description;
        private int otherPrice;
        private int ourPrice;
        private List<FishListResponseDto> similarFish;
    }

    @Getter @Setter
    @Builder
    public static class FishSeasonResponseDto{
        private String season;
        private String seasonDescription;
        private List<FishListResponseDto> fishList;
    }

    @Getter @Setter
    @Builder
    public static class FishPriceResponseDto{
        private Long fishId;
        private String name;
        private String imgUri;
        private int otherPrice;
        private int ourPrice;
        private List<MarketPriceDto> ourWeeklyPrice;
        private List<MarketPriceDto> ourMonthlyPrice;
        private List<MarketPriceDto> ourHalfYearPrice;
        private List<MarketPriceDto> otherWeeklyPrice;
        private List<MarketPriceDto> otherMonthlyPrice;
        private List<MarketPriceDto> otherHalfYearPrice;
    }

    public static interface MarketPriceDto{
        String getDate();
        int getPrice();
    }

}
