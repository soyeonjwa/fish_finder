package com.ssafy.fishfinder.dto;

import com.ssafy.fishfinder.entity.Post;
import com.ssafy.fishfinder.entity.PostType;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class BoardDto {

    @Getter
    @Builder
    @Setter
    public static class CreateRequest {
        private String title;
        private String content;
        private Long writerId;
        private PostType postType;
        private List<ReviewDto.Request> reviews;

        private List<MultipartFile> images;

        public Post of() {
            return Post.builder()
                    .title(title)
                    .content(content)
                    .writerId(writerId)
                    .postType(postType)
                    .fishReviews(new ArrayList<>())
                    .postImages(new ArrayList<>())
                    .build();
        }
    }

    @Getter
    @Setter
    @Builder
    public static class CreateResponse {
        private Long boardId;
        private String uri;
    }

    @Builder
    @Getter
    public static class GetListRequest {
        private String sortBy;
        private int limit;
        private int likeCount;
        private LocalDateTime createdAt;
        private PostType postType;
    }

    @Getter
    @Setter
    @Builder
    public static class GetListResponse {
        private Long boardId;
        private String title;
        private String content;
        private String writer;
        private PostType postType;
        private String thumbnail;
        private int likeCount;
        private int scrapCount;
        private int commentCount;
        private LocalDateTime createdAt;

    }

}
