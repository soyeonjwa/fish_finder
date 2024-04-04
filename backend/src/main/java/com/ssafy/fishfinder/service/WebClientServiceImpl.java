package com.ssafy.fishfinder.service;

import com.ssafy.fishfinder.entity.mysql.Fish;
import com.ssafy.fishfinder.entity.mysql.MarketPrice;
import com.ssafy.fishfinder.entity.mysql.Source;
import com.ssafy.fishfinder.repository.mysql.FishRepository;
import com.ssafy.fishfinder.repository.mysql.MarketPriceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.sql.Date;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class WebClientServiceImpl implements WebClientService{

    private final FishRepository fishRepository;
    private final MarketPriceRepository marketPriceRepository;

    // 다른 사이트에서 데이터를 가져와서 저장하는 메소드
    public void getOtherSiteData() {
        log.info("==========타 사이트 크롤링 시작==========");

        WebClient webClient = WebClient
                .builder()
                .baseUrl("https://pub-api.tpirates.com/v2/www/retail-price/price/aggregate/region?&orderState=default&page=0&size=200")
                .build();

        Map response = webClient.get()
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        List<Fish> fishList = fishRepository.findAll();

        List<Map> list = (List<Map>) response.get("content");

        for(Fish fish : fishList){
            for(Map map : list){
                if(fish.getName().equals(map.get("name"))){
                    marketPriceRepository.save(MarketPrice.builder()
                            .fish(fish)
                            .price((int) map.get("avgPrice"))
                            .date(new Date(System.currentTimeMillis()))
                            .source(Source.others)
                            .build());
                }
            }
        }
        log.info("==========타 사이트 크롤링 종료==========");
    }
}
