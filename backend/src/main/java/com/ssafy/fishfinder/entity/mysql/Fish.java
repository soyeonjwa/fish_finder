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
@SQLDelete(sql = "UPDATE fish SET deleted_at = NOW() WHERE fish_id=?")
@Where(clause = "deleted_at is null")
public class Fish extends BaseTime{

    @Id @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "fish_id")
    private Long id;

    @Column(columnDefinition = "varchar(30)")
    @NotNull
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String img_url;

    @OneToMany(mappedBy = "fish")
    private List<FishFishGroup> fishFIshGroups = new ArrayList<>();

    @OneToMany(mappedBy = "fish")
    private List<MarketPrice> marketPrices = new ArrayList<>();
}
