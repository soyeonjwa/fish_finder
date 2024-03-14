package com.ssafy.fishfinder.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class PostImageDto {

    @Setter @Getter
    @Builder
    public static class Response {
        private Long imageId;
        private String imageUri;
    }
}
