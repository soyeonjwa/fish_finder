package com.ssafy.fishfinder.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class FishDiffDto {

    @Setter @Getter
    @Builder
    public static class FishDiffResponseDto{
        FishDto.FishDetailResponseDto sourceFish;
        FishDto.FishDetailResponseDto targetFish;
        List<FishAttributeDto> attributes;
    }


    @Getter @Setter
    @Builder
    public static class FishAttributeDto{
        String attribute;
        String source_value;
        String target_value;
        String source_img;
        String target_img;
    }
}
