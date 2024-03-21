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
@SQLDelete(sql = "UPDATE fish_review SET deleted_at = NOW() WHERE fish_review_id=?")
@Where(clause = "deleted_at is null")
public class FishReview extends BaseTime{

    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "fish_review_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    @Column(name = "fish_id")
    @NotNull
    private Long fishId;

    @NotNull
    private float weight;

    @Column(name = "price_per_kg")
    @NotNull
    private int pricePerKg;

    @Column(name = "total_price")
    @NotNull
    private int totalPrice;

    // 연관관계 메서드
    public void setPost(Post post){
        this.post = post;
        post.getFishReviews().add(this);
    }
}
