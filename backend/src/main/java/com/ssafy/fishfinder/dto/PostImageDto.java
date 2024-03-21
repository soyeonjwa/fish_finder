package com.ssafy.fishfinder.dto;

import com.ssafy.fishfinder.entity.mysql.PostImages;
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

    @Setter @Getter
    @Builder
    public static class Request {
        private Long imageId;
        private String imageUri;

        public PostImages of() {
            return PostImages.builder()
                    .id(imageId)
                    .url(imageUri)
                    .build();
        }
    }
}
