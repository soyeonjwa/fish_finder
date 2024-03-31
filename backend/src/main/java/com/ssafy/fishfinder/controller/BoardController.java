package com.ssafy.fishfinder.controller;


import com.ssafy.fishfinder.controller.constants.Message;
import com.ssafy.fishfinder.dto.BoardDto;
import com.ssafy.fishfinder.entity.mysql.PostType;
import com.ssafy.fishfinder.exception.CustomException;
import com.ssafy.fishfinder.exception.ErrorCode;
import com.ssafy.fishfinder.service.BoardService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/board")
public class BoardController {

    private final BoardService boardService;

    @PostMapping
    public ResponseEntity<Message> createBoard(
            @RequestPart(value = "data") BoardDto.CreateRequest data,
            @RequestPart(value = "images", required = false)List<MultipartFile> images,
            HttpServletRequest request

    ) {
        HttpSession session = request.getSession(false);
        if(session == null) {
            throw new CustomException(ErrorCode.NO_LOGIN);
        }

        data.setWriterId((Long) session.getAttribute("id"));

        Message message = new Message("게시글 생성 완료", boardService.createBoard(data, images));
        return ResponseEntity.ok(message);
    }

    @GetMapping
    public ResponseEntity<Message> getBoardList(
            @RequestParam(value = "sortBy", required = false, defaultValue = "createdAt") String sortBy,
            @RequestParam(value = "limit", required = false, defaultValue = "10") int limit,
            @RequestParam(value = "likeCount", required = false, defaultValue = "2147483647") int likeCount,
            @RequestParam(value = "createdAt", required = false, defaultValue = "#{T(java.time.LocalDateTime).now()}") LocalDateTime createdAt,
            @RequestParam(value = "postType", required = false, defaultValue = "all") PostType postType,
            @RequestParam(value = "keyword", required = false, defaultValue = "") String keyword
    ) {
        BoardDto.GetListRequest request = BoardDto.GetListRequest.builder()
                .sortBy(sortBy)
                .limit(limit)
                .likeCount(likeCount)
                .createdAt(createdAt)
                .postType(postType)
                .keyword(keyword)
                .build();

        return ResponseEntity.ok(new Message("게시글 목록 조회 완료", boardService.getBoardList(request)));
    }



    @GetMapping("/{id}")
    public ResponseEntity<Message> getBoardDetail(
            @PathVariable Long id,
            HttpServletRequest request
    ) {
        HttpSession session = request.getSession(false);
        if(session == null) {
            throw new CustomException(ErrorCode.NO_LOGIN);
        }
        Long memberId = (Long) session.getAttribute("id");
        return ResponseEntity.ok(new Message("게시글 조회 완료", boardService.getBoardDetail(id, memberId)));
    }

    @PutMapping("/{boardId}")
    public ResponseEntity<Message> updateBoard(
            @PathVariable Long boardId,
            @RequestPart(value = "data") BoardDto.UpdateRequest data,
            @RequestPart(value = "newImages", required = false) List<MultipartFile> images,
            HttpServletRequest request
    ) {
        HttpSession session = request.getSession(false);
        if(session == null) {
            throw new CustomException(ErrorCode.NO_LOGIN);
        }
        Long memberId = (Long) session.getAttribute("id");

        return ResponseEntity.ok(new Message("게시글 수정 완료", boardService.updateBoard(boardId, memberId, data, images)));
    }

    @DeleteMapping("/{boardId}")
    public ResponseEntity<Message> deleteBoard(
            @PathVariable Long boardId,
            HttpServletRequest request
    ) {
        HttpSession session = request.getSession(false);
        if(session == null) {
            throw new CustomException(ErrorCode.NO_LOGIN);
        }
        Long memberId = (Long) session.getAttribute("id");

        boardService.deleteBoard(boardId, memberId);
        return ResponseEntity.ok(new Message("게시글 삭제 완료", null));
    }

    @PostMapping("/comment/{id}")
    public ResponseEntity<Message> createComment(
            @PathVariable Long id,
            @RequestBody BoardDto.CommentRequest data,
            HttpServletRequest request
    ) {
        HttpSession session = request.getSession(false);
        if(session == null) {
            throw new CustomException(ErrorCode.NO_LOGIN);
        }

        return ResponseEntity.ok(new Message("댓글 생성 완료", boardService.createComment(id, data)));
    }

    @DeleteMapping("/comment")
    public ResponseEntity<Message> deleteComment(
            @RequestHeader(value = "commentId") Long commentId,
            HttpServletRequest request
    ) {
        HttpSession session = request.getSession(false);
        if(session == null) {
            throw new CustomException(ErrorCode.NO_LOGIN);
        }
        Long memberId = (Long) session.getAttribute("id");

        boardService.deleteComment(commentId, memberId);
        return ResponseEntity.ok(new Message("댓글 삭제 완료", null));
    }

    @PostMapping("/like/{id}")
    public ResponseEntity<Message> likeBoard(
            @PathVariable Long id,
            HttpServletRequest request
    ) {
        HttpSession session = request.getSession(false);
        if(session == null) {
            throw new CustomException(ErrorCode.NO_LOGIN);
        }
        Long memberId = (Long) session.getAttribute("id");

        return ResponseEntity.ok(new Message(boardService.likeBoard(id, memberId)));
    }

    @PostMapping("/scrap/{id}")
    public ResponseEntity<Message> scrapBoard(
            @PathVariable Long id,
            HttpServletRequest request
    ) {
        HttpSession session = request.getSession(false);
        if(session == null) {
            throw new CustomException(ErrorCode.NO_LOGIN);
        }
        Long memberId = (Long) session.getAttribute("id");

        return ResponseEntity.ok(new Message(boardService.scrapBoard(id, memberId)));
    }

    @GetMapping("/my-scrap")
    public ResponseEntity<Message> getScrapList(
            HttpServletRequest request,
            @RequestParam(value = "lastCreatedAt", required = false, defaultValue = "#{T(java.time.LocalDateTime).now()}") LocalDateTime lastCreatedAt
    ) {
        HttpSession session = request.getSession(false);
        if(session == null) {
            throw new CustomException(ErrorCode.NO_LOGIN);
        }
        Long memberId = (Long) session.getAttribute("id");

        return ResponseEntity.ok(new Message("스크랩 목록 조회 완료", boardService.getMyScrapList(memberId, lastCreatedAt)));
    }

    @GetMapping("/popular")
    public ResponseEntity<Message> getPopularBoardList() {
        return ResponseEntity.ok(new Message("인기 게시글 목록 조회 완료", boardService.getPopularBoardList()));
    }

    @GetMapping("/my-post")
    public ResponseEntity<Message> getMyPostList(
            HttpServletRequest request,
            @RequestParam(value = "lastCreatedAt", required = false, defaultValue = "#{T(java.time.LocalDateTime).now()}") LocalDateTime lastCreatedAt
    ) {
        HttpSession session = request.getSession(false);
        if(session == null) {
            throw new CustomException(ErrorCode.NO_LOGIN);
        }
        Long memberId = (Long) session.getAttribute("id");

        return ResponseEntity.ok(new Message("내가 작성한 게시글 목록 조회 완료", boardService.getMyPostList(memberId, lastCreatedAt)));
    }

    @GetMapping("/my-comment")
    public ResponseEntity<Message> getMyCommentList(
            HttpServletRequest request,
            @RequestParam(value = "lastCreatedAt", required = false, defaultValue = "#{T(java.time.LocalDateTime).now()}") LocalDateTime lastCreatedAt
    ) {
        HttpSession session = request.getSession(false);
        if(session == null) {
            throw new CustomException(ErrorCode.NO_LOGIN);
        }
        Long memberId = (Long) session.getAttribute("id");

        return ResponseEntity.ok(new Message("내가 작성한 댓글 목록 조회 완료", boardService.getMyCommentList(memberId, lastCreatedAt)));
    }

    @GetMapping("/my-record")
    public ResponseEntity<Message> getRecordBoardList(
            HttpServletRequest request
    ) {
        HttpSession session = request.getSession(false);
        if(session == null) {
            throw new CustomException(ErrorCode.NO_LOGIN);
        }
        Long memberId = (Long) session.getAttribute("id");

        return ResponseEntity.ok(new Message("작성글, 댓글, 스크랩한 글 수 조회 완료", boardService.getRecord(memberId)));
    }

}
