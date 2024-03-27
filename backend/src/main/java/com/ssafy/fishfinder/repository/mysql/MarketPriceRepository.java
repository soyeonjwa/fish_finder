package com.ssafy.fishfinder.repository.mysql;

import com.ssafy.fishfinder.dto.FishDto;
import com.ssafy.fishfinder.entity.mysql.MarketPrice;
import com.ssafy.fishfinder.entity.mysql.Source;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MarketPriceRepository extends JpaRepository<MarketPrice, Long>{

    // 특정 물고기의 일주일 시세 조회
    @Query(nativeQuery = true, value = "SELECT DATE(date) AS date, Round(AVG(price), -2) AS price " +
            "FROM market_price " +
            "WHERE fish_id = :fishId AND date >= DATE_SUB(NOW(), INTERVAL 1 WEEK) AND market_price.source = :s " +
            "GROUP BY DATE(date) " +
            "ORDER BY DATE(date)")
    List<FishDto.MarketPriceDto> findWeeklyPrices(Long fishId, String s);

    // 특정 물고기의 한달 시세 조회
    @Query(nativeQuery = true, value = "SELECT YEARWEEK(date) AS date, Round(AVG(price), -2) AS price " +
            "FROM market_price " +
            "WHERE fish_id = :fishId AND date >= DATE_SUB(NOW(), INTERVAL 1 MONTH) AND market_price.source = :s " +
            "GROUP BY YEARWEEK(date) " +
            "ORDER BY YEARWEEK(date)")
    List<FishDto.MarketPriceDto> findMonthlyPrices(Long fishId, String s);

    // 특정 물고기의 6개월 시세 조회
    @Query(nativeQuery = true, value = "SELECT DATE_FORMAT(date, '%Y-%m') AS date, Round(AVG(price),-2) AS price " +
            "FROM market_price " +
            "WHERE fish_id = :fishId AND date >= DATE_SUB(NOW(), INTERVAL 6 MONTH) AND market_price.source = :s " +
            "GROUP BY DATE_FORMAT(date, '%Y-%m') " +
            "ORDER BY DATE_FORMAT(date, '%Y-%m')")
    List<FishDto.MarketPriceDto> findHalfYearPrices(Long fishId, String s);

    // 특정 물고기의 오늘 시세 조회
    @Query("SELECT p FROM MarketPrice p WHERE p.fish.id = :fishId AND DATE(p.date) = CURDATE()-1 AND p.source = :source")
    MarketPrice findTodayPrice(Long fishId, Source source);
}
