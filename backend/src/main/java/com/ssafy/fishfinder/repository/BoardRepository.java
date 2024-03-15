package com.ssafy.fishfinder.repository;

import com.ssafy.fishfinder.dto.BoardDto;
import com.ssafy.fishfinder.entity.Post;
import com.ssafy.fishfinder.entity.PostType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface BoardRepository extends JpaRepository<Post, Long> {


//    @Query("select p from Post p where p.postType in :postType and p.createdAt < :createdAt order by p.createdAt desc")
    @Query(nativeQuery = true, value = "select * from post where post_type in :#{T(com.ssafy.fishfinder.util.PostTypeUtil).getPostTypeList(#postType)} and created_at < :createdAt and deleted_at is null order by created_at desc limit :limit")
    List<Post> findTop10BoardListByCreatedAt(LocalDateTime createdAt, List<PostType> postType, int limit);


//    @Query("select p from Post p where p.postType in :postType and (select count(l) from Likes l where l.post = p) < :likeCount order by (select count(l) from Likes l where l.post = p) desc")
    @Query(nativeQuery = true, value = "select * from post where post_type in :#{T(com.ssafy.fishfinder.util.PostTypeUtil).getPostTypeList(#postType)} and (select count(*) from likes where post_id = post.post_id) < :likeCount and deleted_at is null order by (select count(*) from likes where post_id = post.post_id) desc, created_at desc limit :limit")
    List<Post> findTop10BoardListByLikeCount(int likeCount, List<PostType> postType, int limit);
}
