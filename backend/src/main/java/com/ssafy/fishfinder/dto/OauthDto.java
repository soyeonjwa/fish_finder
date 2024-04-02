package com.ssafy.fishfinder.dto;

import com.ssafy.fishfinder.entity.mysql.Member;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OauthDto {

    private String nickname;
    private String email;

    public Member toEntity() {
        return Member.builder()
                .nickname(nickname)
                .email(email)
                .build();
    }
}
