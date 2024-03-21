package com.ssafy.fishfinder.entity.mysql;

import jakarta.persistence.*;
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
@SQLDelete(sql = "UPDATE fish_group SET deleted_at = NOW() WHERE fish_group_id=?")
@Where(clause = "deleted_at is null")
public class FishGroup extends BaseTime {

    @Id @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "fish_group_id")
    private Long id;

    @Column(columnDefinition = "varchar(20)")
    private String groupName;

    @Enumerated(EnumType.STRING)
    @Column(name = "group_type")
    private GroupType groupType;

    @Column(columnDefinition = "TEXT")
    private String description;

    @OneToMany(mappedBy = "fishGroup")
    private List<FishFishGroup> fishFishGroups = new ArrayList<>();
}
