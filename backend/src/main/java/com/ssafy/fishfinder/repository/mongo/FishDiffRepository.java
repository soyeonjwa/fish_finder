package com.ssafy.fishfinder.repository.mongo;

import com.ssafy.fishfinder.entity.mongo.FishDiff;
import com.ssafy.fishfinder.entity.mysql.Fish;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface FishDiffRepository extends MongoRepository<FishDiff, String> {

    @Query("{ $or: [ { 'source': ?0, 'target': ?1 }, { 'source': ?1, 'target': ?0 } ] }")
    FishDiff findBySourceFishAndTargetFish(String sourceFish, String targetFish);
}
