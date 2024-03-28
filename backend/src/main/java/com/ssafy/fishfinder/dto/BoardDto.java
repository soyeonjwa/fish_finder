package com.ssafy.fishfinder.dto;

import com.ssafy.fishfinder.entity.mysql.Post;
import com.ssafy.fishfinder.entity.mysql.PostType;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

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
        private List<FishReviewDto.Request> reviews;

        public Post of() {
            return Post.builder()
                    .title(title)
                    .content(content)
                    .writerId(writerId)
                    .postType(postType)
                    .fishReviews(new ArrayList<>())
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
        private String keyword;
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

    @Getter
    @Setter
    @Builder
    public static class GetDetailResponse{
        private Long boardId;
        private String title;
        private String content;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private Long writerId;
        private String writerNickname;
        private PostType postType;
        private List<FishReviewDto.Response> reviews;
        private List<PostImageDto.Response> images;
        private int likeCount;
        private int scrapCount;
        private int commentCount;
        private boolean isLiked;
        private boolean isScrapped;
        private List<BoardDto.CommentResponse> comments;
    }

    @Setter @Getter
    @Builder
    public static class UpdateRequest {
        private String title;
        private String content;
        private PostType postType;
        private List<FishReviewDto.UpdateRequest> reviews;
        private List<PostImageDto.Request> oldImages;
    }

    @Setter @Getter
    @Builder
    public static class CommentRequest {
        private Long writerId;
        private String content;
    }

    @Setter @Getter
    @Builder
    public static class CommentResponse {
        private Long commentId;
        private Long writerId;
        private String writerNickname;
        private LocalDateTime createdAt;
        private String content;
    }

}
