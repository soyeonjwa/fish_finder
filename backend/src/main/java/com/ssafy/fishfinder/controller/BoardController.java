package com.ssafy.fishfinder.controller;


import com.ssafy.fishfinder.controller.constants.Message;
import com.ssafy.fishfinder.dto.BoardDto;
import com.ssafy.fishfinder.entity.mysql.PostType;
import com.ssafy.fishfinder.service.BoardService;
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
            @RequestPart(value = "data") BoardDto.CreateRequest request,
            @RequestPart(value = "images", required = false)List<MultipartFile> images
    ) {
        Message message = new Message("게시글 생성 완료", boardService.createBoard(request, images));
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
            @RequestHeader(value = "memberId", required = false) Long memberId
    ) {
        return ResponseEntity.ok(new Message("게시글 조회 완료", boardService.getBoardDetail(id, memberId)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Message> updateBoard(
            @PathVariable Long id,
            @RequestPart(value = "data") BoardDto.UpdateRequest request,
            @RequestPart(value = "newImages", required = false) List<MultipartFile> images
    ) {
        return ResponseEntity.ok(new Message("게시글 수정 완료", boardService.updateBoard(id, request, images)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Message> deleteBoard(@PathVariable Long id) {
        boardService.deleteBoard(id);
        return ResponseEntity.ok(new Message("게시글 삭제 완료", null));
    }

    @PostMapping("/comment/{id}")
    public ResponseEntity<Message> createComment(@PathVariable Long id, @RequestBody BoardDto.CommentRequest request) {
        return ResponseEntity.ok(new Message("댓글 생성 완료", boardService.createComment(id, request)));
    }

    @DeleteMapping("/comment")
    public ResponseEntity<Message> deleteComment(
            @RequestHeader(value = "commentId") Long commentId
    ) {
        boardService.deleteComment(commentId);
        return ResponseEntity.ok(new Message("댓글 삭제 완료", null));
    }

    @PostMapping("/like/{id}")
    public ResponseEntity<Message> likeBoard(
            @PathVariable Long id,
            @RequestHeader(value = "memberId") Long memberId
    ) {
        return ResponseEntity.ok(new Message(boardService.likeBoard(id, memberId)));
    }

    @PostMapping("/scrap/{id}")
    public ResponseEntity<Message> scrapBoard(
            @PathVariable Long id,
            @RequestHeader(value = "memberId") Long memberId
    ) {
        return ResponseEntity.ok(new Message(boardService.scrapBoard(id, memberId)));
    }

    @GetMapping("/scrap")
    public ResponseEntity<Message> getScrapList(
            @RequestHeader(value = "memberId") Long memberId
    ) {
        return ResponseEntity.ok(new Message("스크랩 목록 조회 완료", boardService.getScrapList(memberId)));
    }

    @GetMapping("/popular")
    public ResponseEntity<Message> getPopularBoardList() {
        return ResponseEntity.ok(new Message("인기 게시글 목록 조회 완료", boardService.getPopularBoardList()));
    }

}
