package com.ssafy.fishfinder.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@SQLDelete(sql = "UPDATE likes SET deleted at = NOW() WHERE likes_id=?")
@Where(clause = "deleted = false")
public class Likes extends BaseTime{

    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "likes_id")
    @NotNull
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @NotNull
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    @NotNull
    private Post post;

    // 연관관계 메서드
    public void setMember(Member member){
        this.member = member;
        member.getLikes().add(this);
    }

    public void setPost(Post post){
        this.post = post;
        post.getLikes().add(this);
    }

}
