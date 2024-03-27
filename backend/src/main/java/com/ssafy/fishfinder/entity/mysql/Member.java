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
@SQLDelete(sql = "UPDATE member SET deleted_at = NOW() WHERE member_id=?")
@Where(clause = "deleted_at is null")
public class Member extends BaseTime {

    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @Column(columnDefinition = "varchar(10)")
    @NotNull
    private String nickname;

    @NotNull
    @Column(columnDefinition = "varchar(30)")
    private String email;

    @OneToMany(mappedBy = "member")
    private List<Likes> likes = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Clipping> clippings = new ArrayList<>();

    public void updateNickname(String nickname) { this.nickname = nickname; }
}
