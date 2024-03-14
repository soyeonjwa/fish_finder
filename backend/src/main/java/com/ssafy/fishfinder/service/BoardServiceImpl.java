package com.ssafy.fishfinder.service;


import com.ssafy.fishfinder.dto.BoardDto;
import com.ssafy.fishfinder.dto.ReviewDto;
import com.ssafy.fishfinder.entity.FishReview;
import com.ssafy.fishfinder.entity.Post;
import com.ssafy.fishfinder.entity.PostType;
import com.ssafy.fishfinder.repository.BoardRepository;
import com.ssafy.fishfinder.repository.CommentRepository;
import com.ssafy.fishfinder.repository.FishReviewRepository;
import com.ssafy.fishfinder.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Transactional
@RequiredArgsConstructor
@RestController
public class BoardServiceImpl implements BoardService{

    private final BoardRepository boardRepository;
    private final FishReviewRepository fishReviewRepository;
    private final MemberRepository memberRepository;
    private final CommentRepository commentRepository;

    /**
     * 게시글 생성
     * @param request
     * @param images
     * @return
     */
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

    /**
     * 게시글 목록 조회
     * @param request
     * @return List<BoardDto.GetListResponse>
     */
    public List<BoardDto.GetListResponse> getBoardList(BoardDto.GetListRequest request) {
        List<PostType> postTypes = new ArrayList<>();
        if(request.getPostType().equals(PostType.all)) {
            postTypes.add(PostType.normal);
            postTypes.add(PostType.review);
        } else {
            postTypes.add(request.getPostType());
        }

        List<Post> result = new ArrayList<>();
        if(request.getSortBy().equals("createdAt")) {
            result = boardRepository.findTop10BoardListByCreatedAt(request.getCreatedAt(), postTypes, request.getLimit());
        } else if(request.getSortBy().equals("likeCount")) {
            result = boardRepository.findTop10BoardListByLikeCount(request.getLikeCount(), postTypes, request.getLimit());
        }

        List<BoardDto.GetListResponse> response = new ArrayList<>();
        result.forEach(post -> {
            String writer = "";
            if(memberRepository.findById(post.getWriterId()).isPresent()) {
                writer = memberRepository.findById(post.getWriterId()).get().getNickname();
            }

            response.add(BoardDto.GetListResponse.builder()
                    .boardId(post.getId())
                    .title(post.getTitle())
                    .content(post.getContent())
                    .writer(writer)
                    .postType(post.getPostType())
                    .thumbnail("") // 추후 추가예정
                    .likeCount(post.getLikes().size())
                    .scrapCount(post.getClippings().size())
                    .commentCount(post.getComments().size())
                    .createdAt(post.getCreatedAt())
                    .build()
            );
        });



        return response;
    }

}
