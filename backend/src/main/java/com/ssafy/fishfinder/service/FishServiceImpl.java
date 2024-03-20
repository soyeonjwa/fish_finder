package com.ssafy.fishfinder.service;

import com.ssafy.fishfinder.dto.FishDto;
import com.ssafy.fishfinder.entity.Fish;
import com.ssafy.fishfinder.exception.CustomException;
import com.ssafy.fishfinder.exception.ErrorCode;
import com.ssafy.fishfinder.repository.FishRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Transactional
@RequiredArgsConstructor
@RestController
public class FishServiceImpl implements FishService{

    private final FishRepository fishRepository;

    @Override
    public List<FishDto.FishListResponseDto> getFishList() {
        // 어류 목록 이름순으로 조회
        List<Fish> fishes = fishRepository.findAllOrderByName();

        List<FishDto.FishListResponseDto> response = new ArrayList<>();

        for (Fish fish : fishes) {
            response.add(FishDto.FishListResponseDto.builder()
                    .fishId(fish.getId())
                    .name(fish.getName())
                    .imgUri(fish.getImg_url())
                    .description(fish.getDescription())
                    .build());
        }

        return response;
    }

    @Override
    public FishDto.FishDetailResponseDto getFishDetail(Long fishId) {
        // 어류 상세 조회
        Fish fish = fishRepository.findById(fishId).orElseThrow(()-> new CustomException(ErrorCode.NO_FISH));

        // 유사 어류 조회
        List<Fish> similarFishes = fishRepository.findAllBySimilarFish(fishId);

        List<FishDto.FishListResponseDto> similarFishList = new ArrayList<>();

        for (Fish similarFish : similarFishes) {
            similarFishList.add(FishDto.FishListResponseDto.builder()
                    .fishId(similarFish.getId())
                    .name(similarFish.getName())
                    .imgUri(similarFish.getImg_url())
                    .description(similarFish.getDescription())
                    .build());
        }

        FishDto.FishDetailResponseDto response = FishDto.FishDetailResponseDto.builder()
                .fishId(fish.getId())
                .name(fish.getName())
                .imgUri(fish.getImg_url())
                .description(fish.getDescription())
                .otherPrice(0) // TODO: 다른 가격 조회 로직 추가
                .ourPrice(0)   // TODO: 우리 가격 조회 로직 추가
                .similarFish(similarFishList)
                .build();

        return response;
    }
}
