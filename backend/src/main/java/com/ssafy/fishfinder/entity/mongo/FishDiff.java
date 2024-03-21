package com.ssafy.fishfinder.entity.mongo;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;

@Document(collection = "fish_diff")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FishDiff {
    @Id
    private String id;
    private String target;
    private String source;
    private List<Map<String, Object>> diff;
}
