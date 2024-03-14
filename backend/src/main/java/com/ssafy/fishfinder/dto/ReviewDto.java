package com.ssafy.fishfinder.dto;

import com.ssafy.fishfinder.entity.FishReview;
import lombok.Builder;
import lombok.Getter;

public class ReviewDto {

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
}
