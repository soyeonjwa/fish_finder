package com.ssafy.fishfinder.repository;

import com.ssafy.fishfinder.entity.Clipping;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClippingRepository extends JpaRepository<Clipping, Long> {
    Optional<Clipping> findClippingByPostIdAndMemberId(Long id, Long memberId);
}
