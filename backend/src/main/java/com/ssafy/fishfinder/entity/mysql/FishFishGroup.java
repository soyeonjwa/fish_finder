package com.ssafy.fishfinder.entity.mysql;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@SQLDelete(sql = "UPDATE fish_fish_group SET deleted_at = NOW() WHERE fish_fish_group_id=?")
@Where(clause = "deleted_at is null")
public class FishFishGroup extends BaseTime {

    @Id @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "fish_fish_group_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id")
    private FishGroup fishGroup;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fish_id")
    private Fish fish;

    @ColumnDefault("false")
    private boolean isBanner;

    private String seasonText;

    private String seasonImg;

    public void updateIsBanner(boolean isBanner){
        this.isBanner = isBanner;
    }

    public void updateSeasonText(String seasonText){
        this.seasonText = seasonText;
    }

    public void updateSeasonImg(String seasonImg){
        this.seasonImg = seasonImg;
    }
}
