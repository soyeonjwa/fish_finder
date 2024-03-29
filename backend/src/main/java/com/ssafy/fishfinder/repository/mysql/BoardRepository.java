package com.ssafy.fishfinder.repository.mysql;

import com.ssafy.fishfinder.entity.mysql.Post;
import com.ssafy.fishfinder.entity.mysql.PostType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface BoardRepository extends JpaRepository<Post, Long> {


//    @Query("select p from Post p where p.postType in :postType and p.createdAt < :createdAt order by p.createdAt desc")
    @Query(nativeQuery = true, value = "select * from post where post_type in :#{T(com.ssafy.fishfinder.util.PostTypeUtil).getPostTypeList(#postType)} and title like :keyword and created_at < :createdAt and deleted_at is null order by created_at desc limit :limit")
    List<Post> findTop10BoardListByCreatedAt(LocalDateTime createdAt, List<PostType> postType, int limit, String keyword);


//    @Query("select p from Post p where p.postType in :postType and (select count(l) from Likes l where l.post = p) < :likeCount order by (select count(l) from Likes l where l.post = p) desc")
    @Query(nativeQuery = true, value = "select * from post where post_type in :#{T(com.ssafy.fishfinder.util.PostTypeUtil).getPostTypeList(#postType)} and (select count(*) from likes where post_id = post.post_id) < :likeCount and title like :keyword and deleted_at is null order by (select count(*) from likes where post_id = post.post_id) desc, created_at desc limit :limit")
    List<Post> findTop10BoardListByLikeCount(int likeCount, List<PostType> postType, int limit, String keyword);

//    @Query("SELECT p FROM Post p where p.thumbnail is not null and p.createdAt between :startDate and now() ORDER BY (select count(l) from Likes l where l.post = p) DESC, p.createdAt DESC")
    // jpql로 limit하는 방법 몰라서 native로 작성
    @Query(nativeQuery = true, value = "SELECT * FROM post where thumbnail is not null and created_at between DATE_SUB(NOW(), INTERVAL 7 DAY) and NOW() and deleted_at is null ORDER BY (select count(*) from likes where post_id = post.post_id and likes.deleted_at is null) DESC, created_at DESC limit 4")
    List<Post> findTop4PopularBoardList();

    List<Post> findAllByWriterId(Long writerId);
}
