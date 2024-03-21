package com.ssafy.fishfinder.repository.mysql;

import com.ssafy.fishfinder.entity.mysql.FishReview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FishReviewRepository extends JpaRepository<FishReview, Long> {

    List<FishReview> findAllByPostId(Long id);
}
