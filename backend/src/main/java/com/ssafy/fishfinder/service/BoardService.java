package com.ssafy.fishfinder.service;

import com.ssafy.fishfinder.dto.BoardDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BoardService {
    BoardDto.CreateResponse createBoard(BoardDto.CreateRequest request, List<MultipartFile> images);

    List<BoardDto.GetListResponse> getBoardList(BoardDto.GetListRequest request);

    BoardDto.GetDetailResponse getBoardDetail(Long id, Long memberId);

    BoardDto.CreateResponse updateBoard(Long boardId, Long memberId, BoardDto.UpdateRequest request, List<MultipartFile> images);

    void deleteBoard(Long boardId, Long memberId);

    List<BoardDto.CommentResponse> createComment(Long id, BoardDto.CommentRequest request);

    void deleteComment(Long commentId, Long memberId);

    String likeBoard(Long id, Long memberId);

    String scrapBoard(Long id, Long memberId);

    List<BoardDto.GetListResponse> getScrapList(Long memberId);

    List<BoardDto.GetListResponse> getPopularBoardList();

    BoardDto.RecordResponse getRecord(Long memberId);
}
