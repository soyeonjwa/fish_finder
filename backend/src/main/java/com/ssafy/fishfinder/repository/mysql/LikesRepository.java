package com.ssafy.fishfinder.repository.mysql;

import com.ssafy.fishfinder.entity.mysql.Likes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface LikesRepository extends JpaRepository<Likes, Long> {

    // 좋아요 및 취소 시 deleted_at에 관계없이 조회하기 위해 native 쿼리로 작성하였음
    @Query(nativeQuery = true, value = "SELECT * FROM likes WHERE post_id = :id AND member_id = :memberId")
    Likes findLikes(Long id, Long memberId);

    Optional<Likes> findLikesByPostIdAndMemberId(Long id, Long memberId);
}
