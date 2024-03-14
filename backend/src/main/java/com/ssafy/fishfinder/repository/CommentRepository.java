package com.ssafy.fishfinder.repository;

import com.ssafy.fishfinder.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("select count(c) from Comment c where c.post.id = :id")
    int findCommentCountByPostId(Long id);
}
