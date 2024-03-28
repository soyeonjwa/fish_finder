package com.ssafy.fishfinder.dto;

import com.ssafy.fishfinder.entity.mysql.FishReview;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

public class FishReviewDto {

    @Getter
    @Builder
    public static class Request {
        private Long fishId;
        private float weight;
        private int pricePerKg;
        private int totalPrice;

        public FishReview of() {
            return FishReview.builder()
                    .fishId(fishId)
                    .weight(weight)
                    .pricePerKg(pricePerKg)
                    .totalPrice(totalPrice)
                    .build();
        }

    }

    @Getter @Setter
    @Builder
    public static class Response {
        private Long reviewId;
        private Long fishId;
        private String fishName;
        private float weight;
        private int pricePerKg;
        private int totalPrice;
    }

    @Getter @Setter
    @Builder
    public static class UpdateRequest {
        private Long reviewId;
        private Long fishId;
        private float weight;
        private int pricePerKg;
        private int totalPrice;

        public FishReview of() {
            return FishReview.builder()
                    .id(reviewId)
                    .fishId(fishId)
                    .weight(weight)
                    .pricePerKg(pricePerKg)
                    .totalPrice(totalPrice)
                    .build();
        }
    }

    public static interface AvgPriceDto {
        int getPrice();
        long getId();

        Date getDate();
    }
}
