package com.ssafy.fishfinder.controller;


import com.ssafy.fishfinder.controller.constants.Message;
import com.ssafy.fishfinder.dto.BoardDto;
import com.ssafy.fishfinder.service.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
        System.out.println(request.getTitle());
        Message message = new Message("게시글 생성 완료", boardService.createBoard(request, images));
        return ResponseEntity.ok(message);
    }


}
