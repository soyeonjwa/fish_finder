package com.ssafy.fishfinder.entity.mysql;

import jakarta.persistence.*;
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
@SQLDelete(sql = "UPDATE clipping SET deleted_at = NOW() WHERE clipping_id=?")
@Where(clause = "deleted_at is null")
public class Clipping extends BaseTime{

    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "clipping_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;
    
    // 연관관계 메서드
    public void setMember(Member member){
        this.member = member;
        member.getClippings().add(this);
    }

    public void setPost(Post post){
        this.post = post;
        post.getClippings().add(this);
    }
}
