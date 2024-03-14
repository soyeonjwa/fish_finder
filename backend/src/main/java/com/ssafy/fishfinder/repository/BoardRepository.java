package com.ssafy.fishfinder.repository;

import com.ssafy.fishfinder.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Post, Long> {
}
