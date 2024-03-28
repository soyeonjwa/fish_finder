package com.ssafy.fishfinder.service;

import com.ssafy.fishfinder.dto.FishDiffDto;
import com.ssafy.fishfinder.dto.FishDto;
import java.util.List;

public interface FishService {

    List<FishDto.FishListResponseDto> getFishList();

    List<FishDto.FishListResponseDto> getFishListByName(String keyword);

    FishDto.FishDetailResponseDto getFishDetail(Long fishId);

    FishDiffDto.FishDiffResponseDto getFishDifferences(Long sourceFishId, Long targetFishId);

    FishDto.FishSeasonResponseDto getFishSeason(String ss);

    FishDto.FishPriceResponseDto getFishPrice(Long fishId);
}
