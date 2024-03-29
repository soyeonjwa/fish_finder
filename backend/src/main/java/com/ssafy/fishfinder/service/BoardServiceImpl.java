package com.ssafy.fishfinder.service;


import com.ssafy.fishfinder.dto.BoardDto;
import com.ssafy.fishfinder.dto.FishReviewDto;
import com.ssafy.fishfinder.dto.PostImageDto;
import com.ssafy.fishfinder.entity.mysql.*;
import com.ssafy.fishfinder.exception.CustomException;
import com.ssafy.fishfinder.exception.ErrorCode;
import com.ssafy.fishfinder.repository.mysql.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Transactional
@RequiredArgsConstructor
@Service
public class BoardServiceImpl implements BoardService{
    private final S3UploadService s3UploadService;

    private final BoardRepository boardRepository;
    private final FishRepository fishRepository;
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
            uploadImages(images, post);
            try{
                post.updateThumbnail(s3UploadService.uploadThumbnail(images.get(0), "thumbnail", post.getId()));
            } catch (IOException e) {
                throw new CustomException(ErrorCode.FILE_UPLOAD_ERROR);
            }
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
            result = boardRepository.findTop10BoardListByCreatedAt(request.getCreatedAt(), postTypes, request.getLimit(), '%' + request.getKeyword() + '%');
        } else if(request.getSortBy().equals("likeCount")) {
            result = boardRepository.findTop10BoardListByLikeCount(request.getLikeCount(), postTypes, request.getLimit(), '%' + request.getKeyword() + '%');
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
                    .thumbnail(post.getThumbnail())
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
    public BoardDto.GetDetailResponse getBoardDetail(Long id, Long memberId) {
        // 게시글 가져오기
        Post post = boardRepository.findById(id).orElseThrow(()->new CustomException(ErrorCode.NO_BOARD));

        // 작성자
        Member writer = memberRepository.findById(post.getWriterId()).orElseThrow(()->new CustomException(ErrorCode.NO_MEMBER));

        boolean isLiked = false;
        boolean isScrapped = false;
        // 현재 사용자
        if(memberId != null){
            memberRepository.findById(memberId).orElseThrow(()->new CustomException(ErrorCode.NO_MEMBER));
            // 좋아요 여부
            if(likesRepository.findLikesByPostIdAndMemberId(id, memberId).isPresent()){
                isLiked = true;
            }

            // 스크랩 여부
            if(clippingRepository.findClippingByPostIdAndMemberId(id, memberId).isPresent()){
                isScrapped = true;
            }

        }

        //review 가져오기
        List<FishReview> reviews = fishReviewRepository.findAllByPostId(id);
        List<FishReviewDto.Response> reviewList = new ArrayList<>();
        reviews.forEach(review -> {
            fishRepository.findById(review.getFishId()).ifPresent(fish -> reviewList.add(FishReviewDto.Response.builder()
                    .reviewId(review.getId())
                    .fishName(fish.getName())
                    .fishId(review.getFishId())
                    .weight(review.getWeight())
                    .pricePerKg(review.getPricePerKg())
                    .totalPrice(review.getTotalPrice())
                    .build()
            ));
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

        List<BoardDto.CommentResponse> comment = new ArrayList<>();
        List<Comment> comments = commentRepository.findAllByPostId(id);
        comments.forEach(c -> {
            Member commentWriter = memberRepository.findById(c.getWriterId()).orElseThrow(()->new CustomException(ErrorCode.NO_MEMBER));
            comment.add(BoardDto.CommentResponse.builder()
                    .commentId(c.getId())
                    .content(c.getContent())
                    .writerId(c.getWriterId())
                    .writerNickname(commentWriter.getNickname())
                    .createdAt(c.getCreatedAt())
                    .build()
            );
        });

        return BoardDto.GetDetailResponse.builder()
                .boardId(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .createdAt(post.getCreatedAt())
                .modifiedAt(post.getModifiedAt())
                .writerId(post.getWriterId())
                .writerNickname(writer.getNickname())
                .postType(post.getPostType())
                .likeCount(post.getLikes().size())
                .scrapCount(post.getClippings().size())
                .commentCount(post.getComments().size())
                .isLiked(isLiked)
                .isScrapped(isScrapped)
                .comments(comment)
                .reviews(reviewList)
                .images(imageList)
                .build();
    }

    /**
     * 게시글 수정
     * @param boardId
     * @param request
     * @param images
     * @return BoardDto.CreateResponse
     */
    @Override
    public BoardDto.CreateResponse updateBoard(Long boardId, Long memberId, BoardDto.UpdateRequest request, List<MultipartFile> images) {
        // 게시글 작성자 확인
        Post postWriter = boardRepository.findById(boardId).orElseThrow(()->new CustomException(ErrorCode.NO_BOARD));
        if(!postWriter.getWriterId().equals(memberId)){
            throw new CustomException(ErrorCode.NO_WRITER);
        }

        // 게시글 가져오기
        Post post = boardRepository.findById(boardId).orElseThrow(()->new CustomException(ErrorCode.NO_BOARD));

        // review 가져오기
        List<FishReview> fishReviews = fishReviewRepository.findAllByPostId(boardId);

        // 이미지 가져오기
        List<PostImages> postImages = postImagesRepository.findAllByPostId(boardId);

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
        if(request.getOldImages() != null) {
            // todo 썸네일 삭제시 새로운 썸네일 추가 코드
            for (PostImages postImage : postImages) { // 저장되어 있는 이미지들
                boolean flag = false;
                for (PostImageDto.Request image : request.getOldImages()) { // 계속 저장할 기존 이미지들
                    if (postImage.getId().equals(image.getImageId())) {
                        flag = true;
                        break;
                    }
                }
                if (!flag) postImagesRepository.deleteById(postImage.getId());
            }
        }
        else postImagesRepository.deleteAll(postImages);

        // 새로운 이미지 저장
        if(images != null) {
            uploadImages(images, post);
        }
        
        post.updateTitle(request.getTitle());
        post.updateContent(request.getContent());
        post.updatePostType(request.getPostType());

        return BoardDto.CreateResponse.builder()
                .boardId(post.getId())
                .uri("/api/board/" + post.getId())
                .build();
    }

    /**
     * 게시글 삭제
     * @param boardId
     */
    @Override
    public void deleteBoard(Long boardId, Long memberId) {
        // 게시글 작성자 확인
        Post post = boardRepository.findById(boardId).orElseThrow(()->new CustomException(ErrorCode.NO_BOARD));
        if(!post.getWriterId().equals(memberId)){
            throw new CustomException(ErrorCode.NO_WRITER);
        }

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

    /**
     * 댓글 생성
     * @param id
     * @param request
     * @return List<BoardDto.CommentResponse>
     */
    @Override
    public List<BoardDto.CommentResponse> createComment(Long id, BoardDto.CommentRequest request) {

        Post post = boardRepository.findById(id).orElseThrow(()->new CustomException(ErrorCode.NO_BOARD));

        Comment comment = Comment.builder()
                .content(request.getContent())
                .post(post)
                .writerId(request.getWriterId())
                .build();

        commentRepository.save(comment);

        List<Comment> comments = commentRepository.findAllByPostId(id);

        List<BoardDto.CommentResponse> response = new ArrayList<>();
        comments.forEach(c -> {
            Member writer = memberRepository.findById(c.getWriterId()).orElseThrow(()->new CustomException(ErrorCode.NO_MEMBER));
            response.add(BoardDto.CommentResponse.builder()
                        .commentId(c.getId())
                        .content(c.getContent())
                        .writerId(c.getWriterId())
                        .writerNickname(writer.getNickname())
                        .createdAt(c.getCreatedAt())
                        .build()
            );
        });

        return response;
    }

    /**
     * 댓글 삭제
     * @param commentId
     */
    @Override
    public void deleteComment(Long commentId, Long memberId) {
        // 댓글 작성자 확인
        Comment comment = commentRepository.findById(commentId).
                orElseThrow(()->new CustomException(ErrorCode.NO_COMMENT));
        if(!comment.getWriterId().equals(memberId)){
            throw new CustomException(ErrorCode.NO_WRITER);
        }

        commentRepository.deleteById(commentId);
    }

    /**
     * 좋아요 및 취소
     * @param id
     * @param memberId
     * @return String
     */
    @Override
    public String likeBoard(Long id, Long memberId) {
        // 게시글 조회
        Post post = boardRepository.findById(id).orElseThrow(()->new CustomException(ErrorCode.NO_BOARD));

        // 멤버 조회
        Member member = memberRepository.findById(memberId).orElseThrow(()->new CustomException(ErrorCode.NO_MEMBER));

        // 좋아요 내역조회
        Likes likes = likesRepository.findLikes(id, memberId);
        // 없으면 likes 생성
        if(likes == null){
            likes = Likes.builder()
                    .post(post)
                    .member(member)
                    .build();
            likesRepository.save(likes);
            return "좋아요 완료";
        }
        else{ // 이미 존재할 경우
            if(likes.getDeletedAt() == null){ // 삭제 되지 않았을 시
                likesRepository.delete(likes);
                return "좋아요 취소";
            }
            else{ // 이미 취소되었을 시
                likes.setDeletedAt(null); // todo setter말고 toBuilder로 변경 예정 baseTime 엔티티랑 엮여있어 builder로 변경이 어려움
                likesRepository.save(likes);
                return "좋아요 완료";
            }
        }
    }

    /**
     * 스크랩 및 취소
     * @param id
     * @param memberId
     * @return String
     */
    @Override
    public String scrapBoard(Long id, Long memberId) {
        // 게시글 조회
        Post post = boardRepository.findById(id).orElseThrow(()->new CustomException(ErrorCode.NO_BOARD));

        // 멤버 조회
        Member member = memberRepository.findById(memberId).orElseThrow(()->new CustomException(ErrorCode.NO_MEMBER));

        // 스크랩 내역조회
        Clipping clipping = clippingRepository.findClipping(id, memberId);

        // 없으면 스크랩 생성
        if(clipping == null){
            clipping = Clipping.builder()
                    .post(post)
                    .member(member)
                    .build();
            clippingRepository.save(clipping);
            return "스크랩 완료";
        }
        else{ // 이미 존재할 경우
            if(clipping.getDeletedAt() == null){ // 삭제 되지 않았을 시
                clippingRepository.delete(clipping);
                return "스크랩 취소";
            }
            else{ // 이미 취소되었을 시
                clipping.setDeletedAt(null); // todo setter말고 toBuilder로 변경 예정 baseTime 엔티티랑 엮여있어 builder로 변경이 어려움
                clippingRepository.save(clipping);
                return "스크랩 완료";
            }
        }
    }

    /**
     * 스크랩 목록 조회
     * @param memberId
     * @return List<BoardDto.GetListResponse>
     */
    @Override
    public List<BoardDto.GetListResponse> getScrapList(Long memberId) {
        // 멤버 조회
        Member member = memberRepository.findById(memberId).orElseThrow(()->new CustomException(ErrorCode.NO_MEMBER));

        // 스크랩 조회
        List<Clipping> clippings = clippingRepository.findAllByMemberId(memberId);

        List<Post> posts = new ArrayList<>();

        // 스크랩된 게시글 조회
        clippings.forEach(clipping -> {
            posts.add(clipping.getPost());
        });

        List<BoardDto.GetListResponse> response = new ArrayList<>();

        // Dto 변환
        posts.forEach(post -> {
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
                    .thumbnail(post.getThumbnail())
                    .likeCount(post.getLikes().size())
                    .scrapCount(post.getClippings().size())
                    .commentCount(post.getComments().size())
                    .createdAt(post.getCreatedAt())
                    .build()
            );
        });

        return response;
    }

    @Override
    public List<BoardDto.GetListResponse> getPopularBoardList() {
        // 7일 이내 썸네일이 있는 게시글 Top4 조회
        List<Post> posts = boardRepository.findTop4PopularBoardList();

        List<BoardDto.GetListResponse> response = new ArrayList<>();

        posts.forEach(post -> {
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
                    .thumbnail(post.getThumbnail())
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
     * 내 기록 조회
     * @param memberId
     * @return BoardDto.RecordResponse
     */
    @Override
    public BoardDto.RecordResponse getRecord(Long memberId) {
        // 멤버 조회
        Member member = memberRepository.findById(memberId).orElseThrow(()->new CustomException(ErrorCode.NO_MEMBER));
        // 게시글 수 조회
        int postCount = boardRepository.findAllByWriterId(memberId).size();
        // 댓글 수 조회
        int commentCount = commentRepository.findAllByWriterId(memberId).size();
        // 스크랩 수 조회
        int scrapCount = clippingRepository.findAllByMemberId(memberId).size();

        return BoardDto.RecordResponse.builder()
                .memberId(memberId)
                .nickname(member.getNickname())
                .postCount(postCount)
                .commentCount(commentCount)
                .scrapCount(scrapCount)
                .build();
    }

    /**
     * 이미지 업로드
     * @param images
     * @param post
     */
    private void uploadImages(List<MultipartFile> images, Post post) {
        images.forEach(image -> {
            try {
                String imageUrl = s3UploadService.upload(image, "board", post.getId());
                PostImages postImage = PostImages.builder()
                        .url(imageUrl)
                        .post(post)
                        .build();
                postImagesRepository.save(postImage);
            } catch (Exception e) {
                log.error("이미지 업로드 실패", e);
                throw new CustomException(ErrorCode.FILE_UPLOAD_ERROR);
            }
        });
    }
}
