package com.ssafy.fishfinder.service;

import com.ssafy.fishfinder.dto.FishDiffDto;
import com.ssafy.fishfinder.dto.FishDto;
import com.ssafy.fishfinder.dto.FishFishGroupDto;
import com.ssafy.fishfinder.dto.FishReviewDto;
import com.ssafy.fishfinder.entity.mongo.FishDiff;
import com.ssafy.fishfinder.entity.mysql.*;
import com.ssafy.fishfinder.exception.CustomException;
import com.ssafy.fishfinder.exception.ErrorCode;
import com.ssafy.fishfinder.repository.mongo.FishDiffRepository;
import com.ssafy.fishfinder.repository.mysql.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Slf4j
@Transactional
@RequiredArgsConstructor
@Service
public class FishServiceImpl implements FishService{

    private final S3UploadService s3UploadService;
    private final FishRepository fishRepository;
    private final FishDiffRepository fishDiffRepository;
    private final FishGroupRepository fishGroupRepository;
    private final MarketPriceRepository marketPriceRepository;
    private final FishReviewRepository fishReviewRepository;
    private final WebClientService webClientService;
    private final FishFishGroupRepository fishFishGroupRepository;

    /**
     * 어류 목록 조회
     * @return List<FishDto.FishListResponseDto>
     */
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
    public List<FishDto.FishListResponseDto> getFishListByName(String keyword) {
        // 어류 목록 이름으로 조회
        List<Fish> fishes = fishRepository.findAllByName(keyword);

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


    /**
     * 어류 상세 조회
     * @param fishId
     * @return FishDto.FishDetailResponseDto
     */
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

        // 오늘 시세 조회
        MarketPrice ourTodayPrice = marketPriceRepository.findTodayPrice(fishId, Source.users);
        MarketPrice otherTodayPrice = marketPriceRepository.findTodayPrice(fishId, Source.others);

        FishDto.FishDetailResponseDto response = FishDto.FishDetailResponseDto.builder()
                .fishId(fish.getId())
                .name(fish.getName())
                .imgUri(fish.getImg_url())
                .description(fish.getDescription())
                .otherPrice(otherTodayPrice==null?0:otherTodayPrice.getPrice())
                .ourPrice(ourTodayPrice==null?0:ourTodayPrice.getPrice())
                .similarFish(similarFishList)
                .build();

        return response;
    }

    /**
     * 어류 비교 정보 조회
     * @param sourceFishId
     * @param targetFishId
     * @return FishDiffDto.FishDiffResponseDto
     */
    @Override
    public FishDiffDto.FishDiffResponseDto getFishDifferences(Long sourceFishId, Long targetFishId) {
        //sourceFish 존재 여부 확인
        Fish sourceFish = fishRepository.findById(sourceFishId).orElseThrow(()-> new CustomException(ErrorCode.NO_FISH));

        //targetFish 존재 여부 확인
        Fish targetFish = fishRepository.findById(targetFishId).orElseThrow(()-> new CustomException(ErrorCode.NO_FISH));

        //sourceFish와 targetFish의 차이점 조회
        FishDiff fishDiff = fishDiffRepository.findBySourceFishAndTargetFish(sourceFish.getName(), targetFish.getName());
        if(fishDiff == null){
            throw new CustomException(ErrorCode.NO_FISH_DIFF);
        }

        // 순서 다를경우 변경
        if(!sourceFish.getName().equals(fishDiff.getSource())){
            Fish TempFish = sourceFish;
            sourceFish = targetFish;
            targetFish = TempFish;
        }

        List<FishDiffDto.FishAttributeDto> attributes = new ArrayList<>();

        for (Map<String, Object> diff : fishDiff.getDiff()) {
            attributes.add(FishDiffDto.FishAttributeDto.builder()
                    .attribute(diff.get("attribute").toString())
                    .source_value(diff.get("source_value").toString())
                    .target_value(diff.get("target_value").toString())
                    .source_img(diff.get("source_img").toString())
                    .target_img(diff.get("target_img").toString())
                    .build());
        }

        FishDiffDto.FishDiffResponseDto response = FishDiffDto.FishDiffResponseDto.builder()
                .sourceFish(FishDto.FishDetailResponseDto.builder()
                        .fishId(sourceFish.getId())
                        .name(sourceFish.getName())
                        .imgUri(sourceFish.getImg_url())
                        .description(sourceFish.getDescription())
                        .build())
                .targetFish(FishDto.FishDetailResponseDto.builder()
                        .fishId(targetFish.getId())
                        .name(targetFish.getName())
                        .imgUri(targetFish.getImg_url())
                        .description(targetFish.getDescription())
                        .build())
                .attributes(attributes)
                .build();


        return response;
    }

    /**
     * 어류 계절별 조회
     * @param ss
     * @return FishDto.FishSeasonResponseDto
     */
    @Override
    public FishDto.FishSeasonResponseDto getFishSeason(String ss) {
        FishGroup fishGroup = fishGroupRepository.findSeasonByName(ss);
        if(fishGroup == null) throw new CustomException(ErrorCode.NO_FISH_GROUP);

        List<Fish> fishes = fishRepository.findAllByFishGroup(fishGroup.getId());

        List<FishDto.FishListResponseDto> fishList = new ArrayList<>();

        for (Fish fish : fishes) {
            fishList.add(FishDto.FishListResponseDto.builder()
                    .fishId(fish.getId())
                    .name(fish.getName())
                    .imgUri(fish.getImg_url())
                    .description(fish.getDescription())
                    .build());
        }

        FishDto.FishSeasonResponseDto response = FishDto.FishSeasonResponseDto.builder()
                .season(fishGroup.getGroupName())
                .seasonDescription(fishGroup.getDescription())
                .fishList(fishList)
                .build();

        return response;
    }

    /**
     * 어류 가격 조회
     * @param fishId
     * @return FishDto.FishPriceResponseDto
     */
    @Override
    public FishDto.FishPriceResponseDto getFishPrice(Long fishId) {
        // 물고기 존재 여부 확인
        Fish fish = fishRepository.findById(fishId).orElseThrow(()-> new CustomException(ErrorCode.NO_FISH));

        // 오늘 시세 조회
        MarketPrice ourTodayPrice = marketPriceRepository.findTodayPrice(fishId, Source.users);
        MarketPrice otherTodayPrice = marketPriceRepository.findTodayPrice(fishId, Source.others);

        // 일주일, 한달, 6개월 시세 조회(우리)
        List<FishDto.MarketPriceDto> ourWeeklyPrices = marketPriceRepository.findWeeklyPrices(fishId, "users");
        List<FishDto.MarketPriceDto> ourMonthlyPrices = marketPriceRepository.findMonthlyPrices(fishId, "users");
        List<FishDto.MarketPriceDto> ourHalfYearPrices = marketPriceRepository.findHalfYearPrices(fishId, "users");

        // 일주일, 한달, 6개월 시세 조회(타사)
        List<FishDto.MarketPriceDto> otherWeeklyPrices = marketPriceRepository.findWeeklyPrices(fishId, "others");
        List<FishDto.MarketPriceDto> otherMonthlyPrices = marketPriceRepository.findMonthlyPrices(fishId, "others");
        List<FishDto.MarketPriceDto> otherHalfYearPrices = marketPriceRepository.findHalfYearPrices(fishId, "others");

        FishDto.FishPriceResponseDto response = FishDto.FishPriceResponseDto.builder()
                .fishId(fish.getId())
                .name(fish.getName())
                .imgUri(fish.getImg_url())
                .ourPrice(ourTodayPrice==null?0:ourTodayPrice.getPrice()) // 없을 경우 0
                .otherPrice(otherTodayPrice==null?0:otherTodayPrice.getPrice()) // 없을 경우 0
                .ourWeeklyPrice(ourWeeklyPrices)
                .ourMonthlyPrice(ourMonthlyPrices)
                .ourHalfYearPrice(ourHalfYearPrices)
                .otherWeeklyPrice(otherWeeklyPrices)
                .otherMonthlyPrice(otherMonthlyPrices)
                .otherHalfYearPrice(otherHalfYearPrices)
                .build();

        return response;
    }

    /**
     * 유저게시판, 다른 사이트에서 데이터를 가져와서 저장하는 메소드
     */
    @Scheduled(cron = "0 50 23 * * *") // 매일 23시 50분에 실행
    public void setFishPrice() {
        // 다른 사이트에서 데이터를 가져와서 저장하는 메소드
        webClientService.getOtherSiteData();
        
        // 유저게시판에서 데이터를 가져와서 저장하는 메소드
        setOurSiteData();
    }

    /**
     * 유저게시판에서 데이터를 가져와서 저장하는 메소드
     */
    public void setOurSiteData() {
        List<FishReviewDto.AvgPriceDto> avgPrices = fishReviewRepository.findAvgPriceAll();

        for (FishReviewDto.AvgPriceDto avgPriceDto : avgPrices) {
            Fish fish = fishRepository.findById(avgPriceDto.getId()).orElse(null);
            if (fish == null) continue;
            marketPriceRepository.save(MarketPrice.builder()
                    .fish(fish)
                    .price(avgPriceDto.getPrice())
                    .date(avgPriceDto.getDate())
                    .source(Source.users)
                    .build());
        }
    }

}
