package com.ssafy.fishfinder.service;


import com.ssafy.fishfinder.dto.BoardDto;
import com.ssafy.fishfinder.dto.ReviewDto;
import com.ssafy.fishfinder.entity.FishReview;
import com.ssafy.fishfinder.entity.Post;
import com.ssafy.fishfinder.repository.BoardRepository;
import com.ssafy.fishfinder.repository.FishReviewRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@Transactional
@RequiredArgsConstructor
@RestController
public class BoardServiceImpl implements BoardService{

    private final BoardRepository boardRepository;
    private final FishReviewRepository fishReviewRepository;
    public BoardDto.CreateResponse createBoard(BoardDto.CreateRequest request, List<MultipartFile> images) {
        Post post = request.of();
        boardRepository.save(post);
        if(request.getReviews() != null) {
            List<FishReview> reviews = request.getReviews().stream().map(ReviewDto.Request::of).toList();
            reviews.forEach(review -> review.setPost(post));
            fishReviewRepository.saveAll(reviews);
            post.toBuilder().fishReviews(reviews);
        }

        if(request.getImages() != null) {
            // 이미지 저장
        }

        return BoardDto.CreateResponse.builder()
                .boardId(post.getId())
                .uri("/api/board/" + post.getId())
                .build();
    }

}
