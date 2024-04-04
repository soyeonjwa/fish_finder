package com.ssafy.fishfinder.service;

import com.ssafy.fishfinder.dto.FishFishGroupDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BannerService {
    FishFishGroupDto.ReadResponse createFishSeasonBanner(FishFishGroupDto.CreateRequest data, MultipartFile image);

    List<FishFishGroupDto.ReadResponse> getFishSeasonBanner();
}

