package com.ssafy.fishfinder.entity.mysql;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@SQLDelete(sql = "UPDATE post_images SET deleted_at = NOW() WHERE post_images_id=?")
@Where(clause = "deleted_at is null")
public class PostImages extends BaseTime{

    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "post_images_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    @NotNull
    private String url;

    // 연관관계 메서드
    public void setPost(Post post){
        this.post = post;
        post.getPostImages().add(this);
    }
}
