package com.ssafy.fishfinder.repository.mongo;

import com.ssafy.fishfinder.entity.mongo.FishDiff;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FishDiffRepository extends MongoRepository<FishDiff, String> {
}
