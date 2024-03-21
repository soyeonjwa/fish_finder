package com.ssafy.fishfinder.repository.mysql;

import com.ssafy.fishfinder.entity.mysql.Clipping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ClippingRepository extends JpaRepository<Clipping, Long> {


    // 스크랩 및 취소 시 deleted_at에 관계없이 조회하기 위해 native 쿼리로 작성하였음
    @Query(nativeQuery = true, value = "SELECT * FROM clipping WHERE post_id = :id AND member_id = :memberId")
    Clipping findClipping(Long id, Long memberId);
    Optional<Clipping> findClippingByPostIdAndMemberId(Long id, Long memberId);


    List<Clipping> findAllByMemberId(Long memberId);
}
