package com.ssafy.fishfinder.repository;

import com.ssafy.fishfinder.entity.Likes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikesRepository extends JpaRepository<Likes, Long> {
}
