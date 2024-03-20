package com.ssafy.fishfinder.controller;

import com.ssafy.fishfinder.controller.constants.Message;
import com.ssafy.fishfinder.service.FishService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/fishes")
public class FishController {

    private final FishService fishService;

    @GetMapping
    public ResponseEntity<Message> getFishList() {
        return ResponseEntity.ok(new Message("어류 목록 조회 완료", fishService.getFishList()));
    }

    @GetMapping("/{fishId}")
    public ResponseEntity<Message> getFishDetail(
            @PathVariable Long fishId
    ) {
        return ResponseEntity.ok(new Message("어류 상세 조회 완료", fishService.getFishDetail(fishId)));
    }

}
