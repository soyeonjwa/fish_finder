package com.ssafy.fishfinder.repository.mysql;

import com.ssafy.fishfinder.entity.mysql.FishGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FishGroupRepository extends JpaRepository<FishGroup, Long> {

    @Query("select f from FishGroup f where f.groupName = :ss and f.groupType = 'season'")
    FishGroup findSeasonByName(String ss);
}
