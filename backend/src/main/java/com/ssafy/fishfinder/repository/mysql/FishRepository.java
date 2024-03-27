package com.ssafy.fishfinder.repository.mysql;

import com.ssafy.fishfinder.entity.mysql.Fish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FishRepository extends JpaRepository<Fish, Long> {

    @Query("SELECT f FROM Fish f ORDER BY f.name")
    List<Fish> findAllOrderByName();

    @Query("SELECT f FROM Fish f WHERE f.id != :fishId AND f IN (SELECT g.fish FROM FishFishGroup g WHERE g.fishGroup IN (SELECT g FROM FishGroup g WHERE g.groupType = 'similarity' AND g IN (SELECT g.fishGroup FROM FishFishGroup g WHERE g.fish.id = :fishId)))")
    List<Fish> findAllBySimilarFish(Long fishId);

    @Query("SELECT f FROM Fish f WHERE f in (SELECT g.fish FROM FishFishGroup g WHERE g.fishGroup.id = :id)")
    List<Fish> findAllByFishGroup(Long id);

    @Query("SELECT f FROM Fish f WHERE f.name LIKE %:keyword% ORDER BY f.name")
    List<Fish> findAllByName(String keyword);
}
