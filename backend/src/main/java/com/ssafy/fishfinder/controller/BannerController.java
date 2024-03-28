package com.ssafy.fishfinder.controller;

import com.ssafy.fishfinder.controller.constants.Message;
import com.ssafy.fishfinder.dto.FishFishGroupDto;
import com.ssafy.fishfinder.service.BannerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/banner")
public class BannerController {

    private final BannerService bannerService;

    @PostMapping("/season")
    public ResponseEntity<Message> createFishSeasonBanner(
            @RequestPart(value = "data") FishFishGroupDto.CreateRequest data,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) {
        return ResponseEntity.ok(new Message("제철 물고기 배너 생성 완료", bannerService.createFishSeasonBanner(data, image)));
    }

    @GetMapping("/season")
    public ResponseEntity<Message> getFishSeasonBanner() {
        return ResponseEntity.ok(new Message("제철 물고기 배너 조회 완료", bannerService.getFishSeasonBanner()));
    }

}
