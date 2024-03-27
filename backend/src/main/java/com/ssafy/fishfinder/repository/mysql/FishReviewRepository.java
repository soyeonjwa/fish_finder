package com.ssafy.fishfinder.repository.mysql;

import com.ssafy.fishfinder.dto.FishReviewDto;
import com.ssafy.fishfinder.entity.mysql.FishReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FishReviewRepository extends JpaRepository<FishReview, Long> {

    List<FishReview> findAllByPostId(Long id);

    @Query(nativeQuery = true, value = "SELECT fish_id as id, ROUND(AVG(price_per_kg),0) AS price, Date(created_at) AS date FROM fish_review WHERE Date(created_at) = CurDate() AND deleted_at is null GROUP BY fish_id, Date(created_at);")
    List<FishReviewDto.AvgPriceDto> findAvgPriceAll();
}
