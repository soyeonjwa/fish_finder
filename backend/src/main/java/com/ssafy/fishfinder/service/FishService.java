package com.ssafy.fishfinder.service;

import com.ssafy.fishfinder.dto.FishDto;

import java.util.List;

public interface FishService {

    List<FishDto.FishListResponseDto> getFishList();

    FishDto.FishDetailResponseDto getFishDetail(Long fishId);

}
