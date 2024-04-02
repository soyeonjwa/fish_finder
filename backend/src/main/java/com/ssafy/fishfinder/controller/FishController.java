package com.ssafy.fishfinder.controller;

import com.ssafy.fishfinder.controller.constants.Message;
import com.ssafy.fishfinder.dto.FishFishGroupDto;
import com.ssafy.fishfinder.service.FishService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/search")
    public ResponseEntity<Message> searchFish(
            @RequestParam String keyword
    ) {
        return ResponseEntity.ok(new Message("어류 검색 완료", fishService.getFishListByName(keyword)));
    }

    @GetMapping("/{fishId}")
    public ResponseEntity<Message> getFishDetail(
            @PathVariable Long fishId
    ) {
        return ResponseEntity.ok(new Message("어류 상세 조회 완료", fishService.getFishDetail(fishId)));
    }

    @GetMapping("/differences/{sourceFishId}/{targetFishId}")
    public ResponseEntity<Message> getFishDifferences(
            @PathVariable Long sourceFishId,
            @PathVariable Long targetFishId
    ) {
        return ResponseEntity.ok(new Message("어류 비교 조회 완료", fishService.getFishDifferences(sourceFishId, targetFishId)));
    }

    @GetMapping("season")
    public ResponseEntity<Message> getFishSeason(
            @RequestParam String ss // season ex)"1월"
    ) {
        return ResponseEntity.ok(new Message("제철 물고기 조회 완료", fishService.getFishSeason(ss)));
    }

    @GetMapping("price")
    public ResponseEntity<Message> getFishPrice(
            @RequestParam Long fishId
    ) {
        return ResponseEntity.ok(new Message("어류 가격 조회 완료", fishService.getFishPrice(fishId)));
    }

}
