package com.ssafy.fishfinder.repository;

import com.ssafy.fishfinder.entity.FishReview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FishReviewRepository extends JpaRepository<FishReview, Long> {

    List<FishReview> findAllByPostId(Long id);
}
