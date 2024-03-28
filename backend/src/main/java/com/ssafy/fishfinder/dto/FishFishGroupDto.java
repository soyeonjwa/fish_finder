package com.ssafy.fishfinder.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

public class FishFishGroupDto {

    @Getter @Setter
    @Builder
    public static class CreateRequest{
        String text;
        Long fishId;
        String groupName;
    }

    @Getter @Setter
    @Builder
    public static class ReadResponse{
        Long fishFishGroupId;
        String text;
        String fishName;
        String imgUri;
    }
}
