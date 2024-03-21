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
@SQLDelete(sql = "UPDATE comment SET deleted_at = NOW() WHERE comment_id=?")
@Where(clause = "deleted_at is null")
public class Comment extends BaseTime{

    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    @Column(name = "writer_id")
    @NotNull
    private Long writerId;

    @Column(columnDefinition = "TEXT")
    @NotNull
    private String content;
}
