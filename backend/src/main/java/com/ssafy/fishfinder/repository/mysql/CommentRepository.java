package com.ssafy.fishfinder.repository.mysql;

import com.ssafy.fishfinder.entity.mysql.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("select count(c) from Comment c where c.post.id = :id")
    int findCommentCountByPostId(Long id);



    List<Comment> findAllByPostId(Long id);

    List<Comment> findAllByWriterId(Long memberId);
}
