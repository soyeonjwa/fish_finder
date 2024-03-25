package com.ssafy.fishfinder.dto;

import com.ssafy.fishfinder.entity.mysql.Member;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserDto {

    @Getter
    @Builder
    public static class Request{

    }

    @Getter
    @Builder
    public static class Response {

        private Long id;
        private String nickname;

    }

    public static Response toResponse(Member member){
        return Response.builder()
                .id(member.getId())
                .nickname(member.getNickname())
                .build();
    }
}
