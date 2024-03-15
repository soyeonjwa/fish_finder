package com.ssafy.fishfinder.service;


import com.ssafy.fishfinder.dto.BoardDto;
import com.ssafy.fishfinder.dto.FishReviewDto;
import com.ssafy.fishfinder.dto.PostImageDto;
import com.ssafy.fishfinder.entity.*;
import com.ssafy.fishfinder.exception.CustomException;
import com.ssafy.fishfinder.exception.ErrorCode;
import com.ssafy.fishfinder.repository.*;
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
    private final PostImagesRepository postImagesRepository;
    private final CommentRepository commentRepository;
    private final LikesRepository likesRepository;
    private final ClippingRepository clippingRepository;

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
            List<FishReview> reviews = request.getReviews().stream().map(FishReviewDto.Request::of).toList();
            reviews.forEach(review -> review.setPost(post));
            fishReviewRepository.saveAll(reviews);
            post.toBuilder().fishReviews(reviews);
        }

        if(images != null) {
            // todo 이미지 저장
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

    /**
     * 게시글 상세 조회
     * @param id
     * @return BoardDto.GetDetailResponse
     */
    @Override
    public BoardDto.GetDetailResponse getBoardDetail(Long id) {
        // 게시글 가져오기
        Post post = boardRepository.findById(id).orElseThrow(()->new CustomException(ErrorCode.NO_BOARD));

        // 작성자
        Member writer = memberRepository.findById(post.getWriterId()).orElseThrow(()->new CustomException(ErrorCode.NO_MEMBER));

        //review 가져오기
        List<FishReview> reviews = fishReviewRepository.findAllByPostId(id);
        List<FishReviewDto.Response> reviewList = new ArrayList<>();
        reviews.forEach(review -> {
            reviewList.add(FishReviewDto.Response.builder()
                    .reviewId(review.getId())
                    .fishId(review.getFishId())
                    .weight(review.getWeight())
                    .pricePerKg(review.getPricePerKg())
                    .totalPrice(review.getTotalPrice())
                    .build()
            );
        });


        // 이미지 가져오기
        List<PostImages> postImages = postImagesRepository.findAllByPostId(id);
        List<PostImageDto.Response> imageList = new ArrayList<>();
        postImages.forEach(image -> {
            imageList.add(PostImageDto.Response.builder()
                    .imageId(image.getId())
                    .imageUri(image.getUrl())
                    .build()
            );
        });


        // response 생성
        BoardDto.GetDetailResponse response = BoardDto.GetDetailResponse.builder()
                .boardId(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .createdAt(post.getCreatedAt())
                .modifiedAt(post.getModifiedAt())
                .writerId(post.getWriterId())
                .writerNickname(writer.getNickname())
                .postType(post.getPostType())
                .reviews(reviewList)
                .images(imageList)
                .build();

        return response;
    }

    /**
     * 게시글 수정
     * @param id
     * @param request
     * @param images
     * @return BoardDto.CreateResponse
     */
    @Override
    public BoardDto.CreateResponse updateBoard(Long id, BoardDto.UpdateRequest request, List<MultipartFile> images) {

        // 게시글 가져오기
        Post post = boardRepository.findById(id).orElseThrow(()->new CustomException(ErrorCode.NO_BOARD));

        // review 가져오기
        List<FishReview> fishReviews = fishReviewRepository.findAllByPostId(id);

        // 이미지 가져오기
        List<PostImages> postImages = postImagesRepository.findAllByPostId(id);

        // 삭제된 리뷰 삭제
        fishReviews.forEach(review ->{
            if(request.getReviews().stream()
                    .filter(reviewDto -> reviewDto.getReviewId()!=null)
                    .noneMatch(reviewDto -> reviewDto.getReviewId().equals(review.getId())
                    )){
                fishReviewRepository.delete(review);
            }
        });

        // 새로운 리뷰 저장
        request.getReviews().forEach(reviewDto -> {
            if(reviewDto.getReviewId() == null){
                FishReview review = reviewDto.of();
                review.setPost(post);
                fishReviewRepository.save(review);
            }
        });

        // 삭제된 이미지 삭제
        postImages.forEach(image ->{
            if(request.getOldImages().stream()
                    .filter(imageDto -> imageDto.getImageId()!=null)
                    .noneMatch(imageDto -> imageDto.getImageId().equals(image.getId()))){
                postImagesRepository.delete(image);
            }
        });

        // todo: 새로운 이미지 저장 기능

        post.toBuilder()
                .title(request.getTitle())
                .content(request.getContent())
                .postType(request.getPostType())
                .build();

        boardRepository.save(post);

        return BoardDto.CreateResponse.builder()
                .boardId(post.getId())
                .uri("/api/board/" + post.getId())
                .build();
    }

    /**
     * 게시글 삭제
     * @param id
     */
    @Override
    public void deleteBoard(Long id) {
        Post post = boardRepository.findById(id).orElseThrow(()->new CustomException(ErrorCode.NO_BOARD));

        // 연관된 리뷰 삭제
        if(post.getFishReviews() != null) {
            List<FishReview> fishReviews = post.getFishReviews();
            fishReviewRepository.deleteAll(fishReviews);
        }

        // 연관된 이미지 삭제
        if(post.getPostImages() != null) {
            List<PostImages> postImages = post.getPostImages();
            postImagesRepository.deleteAll(postImages);
        }

        // 연관된 댓글 삭제
        if(post.getComments() != null){
            List<Comment> comments = post.getComments();
            commentRepository.deleteAll(comments);
        }

        // 연관된 좋아요 삭제
        if(post.getLikes() != null){
            List<Likes> likes = post.getLikes();
            likesRepository.deleteAll(likes);
        }

        // 연관된 스크랩 삭제
        if(post.getClippings() != null){
            List<Clipping> clippings = post.getClippings();
            clippingRepository.deleteAll(clippings);
        }

        boardRepository.delete(post);
    }

}
