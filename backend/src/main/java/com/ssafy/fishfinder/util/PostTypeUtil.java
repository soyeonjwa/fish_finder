package com.ssafy.fishfinder.util;

import com.ssafy.fishfinder.entity.mysql.PostType;

import java.util.List;

public class PostTypeUtil {
    public static List<String> getPostTypeList(List<PostType> postTypes){
        return postTypes.stream().map(PostType::name).toList();
    }
}
