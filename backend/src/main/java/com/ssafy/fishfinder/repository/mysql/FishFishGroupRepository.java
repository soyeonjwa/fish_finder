package com.ssafy.fishfinder.repository.mysql;

import com.ssafy.fishfinder.entity.mysql.Fish;
import com.ssafy.fishfinder.entity.mysql.FishFishGroup;
import com.ssafy.fishfinder.entity.mysql.FishGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FishFishGroupRepository extends JpaRepository<FishFishGroup, Long> {
    FishFishGroup findByFishGroupAndFish(FishGroup fishGroup, Fish fish);

    List<FishFishGroup> findByFishGroupAndIsBannerTrue(FishGroup fishGroup);
}
