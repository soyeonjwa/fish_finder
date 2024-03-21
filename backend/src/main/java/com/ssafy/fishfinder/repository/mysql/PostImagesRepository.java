package com.ssafy.fishfinder.repository.mysql;

import com.ssafy.fishfinder.entity.mysql.PostImages;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostImagesRepository extends JpaRepository<PostImages, Long> {
    List<PostImages> findAllByPostId(Long id);
}
