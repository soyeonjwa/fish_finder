package com.ssafy.fishfinder.service;

import com.ssafy.fishfinder.dto.FishFishGroupDto;
import com.ssafy.fishfinder.entity.mysql.Fish;
import com.ssafy.fishfinder.entity.mysql.FishFishGroup;
import com.ssafy.fishfinder.entity.mysql.FishGroup;
import com.ssafy.fishfinder.exception.CustomException;
import com.ssafy.fishfinder.exception.ErrorCode;
import com.ssafy.fishfinder.repository.mysql.FishFishGroupRepository;
import com.ssafy.fishfinder.repository.mysql.FishGroupRepository;
import com.ssafy.fishfinder.repository.mysql.FishRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Slf4j
@Transactional
@RequiredArgsConstructor
@Service
public class BannerServiceImpl implements BannerService{

    private final FishFishGroupRepository fishFishGroupRepository;
    private final FishGroupRepository fishGroupRepository;
    private final FishRepository fishRepository;
    private final S3UploadService s3UploadService;

    /**
     * 어류 계절 배너 생성
     * @param data
     * @param image
     * @return FishFishGroupDto.ReadResponse
     */
    @Override
    public FishFishGroupDto.ReadResponse createFishSeasonBanner(FishFishGroupDto.CreateRequest data, MultipartFile image) {
        FishGroup fishGroup = fishGroupRepository.findSeasonByName(data.getGroupName());
        if(fishGroup == null) throw new CustomException(ErrorCode.NO_FISH_GROUP);

        Fish fish = fishRepository.findById(data.getFishId()).orElseThrow(()-> new CustomException(ErrorCode.NO_FISH));


        FishFishGroup fishFishGroup = fishFishGroupRepository.findByFishGroupAndFish(fishGroup, fish);

        String imgUri = null;

        try{
            imgUri = s3UploadService.upload(image, "Banner", fishGroup.getId());
        } catch (Exception e){
            log.error(e.getMessage());
            throw new CustomException(ErrorCode.FILE_UPLOAD_ERROR);
        }

        fishFishGroup.updateIsBanner(true); // 배너로 설정
        fishFishGroup.updateSeasonText(data.getText());
        fishFishGroup.updateSeasonImg(imgUri);

        FishFishGroupDto.ReadResponse response = FishFishGroupDto.ReadResponse.builder()
                .fishName(fish.getName())
                .fishId(fish.getId())
                .text(data.getText())
                .imgUri(imgUri)
                .build();

        return response;
    }

    /**
     * 어류 계절 배너 조회
     * @return List<FishFishGroupDto.ReadResponse>
     */
    @Override
    public List<FishFishGroupDto.ReadResponse> getFishSeasonBanner() {
        int month = Calendar.getInstance().get(Calendar.MONTH) + 1;
        String monthStr = month+"월";
        FishGroup fishGroup = fishGroupRepository.findSeasonByName(monthStr);

        List<FishFishGroup> fishFishGroups = fishFishGroupRepository.findByFishGroupAndIsBannerTrue(fishGroup);

        List<FishFishGroupDto.ReadResponse> response = new ArrayList<>();

        for(FishFishGroup fishFishGroup : fishFishGroups){
            response.add(FishFishGroupDto.ReadResponse.builder()
                    .fishName(fishFishGroup.getFish().getName())
                    .fishId(fishFishGroup.getFish().getId())
                    .text(fishFishGroup.getSeasonText())
                    .imgUri(fishFishGroup.getSeasonImg())
                    .build());
        }

        return response;
    }

}
