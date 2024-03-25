package com.ssafy.fishfinder.entity.mysql;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@SQLDelete(sql = "UPDATE post SET deleted_at = NOW() WHERE post_id=?")
@Where(clause = "deleted_at is null")
public class Post extends BaseTime {

    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long id;

    @NotNull
    private String title;

    @Column(columnDefinition = "TEXT")
    @NotNull
    private String content;

    @Column(name = "writer_id")
    @NotNull
    private Long writerId;

    @Enumerated(EnumType.STRING)
    @Column(name = "post_type")
    private PostType postType;

    @Column(name = "thumbnail")
    private String thumbnail;

    @OneToMany(mappedBy = "post")
    private List<Likes> likes = new ArrayList<>();

    @OneToMany(mappedBy = "post")
    private List<Clipping> clippings = new ArrayList<>();

    @OneToMany(mappedBy = "post")
    private List<PostImages> postImages = new ArrayList<>();

    @OneToMany(mappedBy = "post")
    private List<FishReview> fishReviews = new ArrayList<>();

    @OneToMany(mappedBy = "post")
    private List<Comment> comments = new ArrayList<>();

    public void updateThumbnail(String thumbnail){
        this.thumbnail = thumbnail;
    }

    public void updateTitle(String title){
        this.title = title;
    }

    public void updateContent(String content){
        this.content = content;
    }

    public void updatePostType(PostType postType){
        this.postType = postType;
    }

}
