package com.ssafy.fishfinder.dto;

import com.ssafy.fishfinder.entity.mysql.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserDto {

    private Long id;
    private String nickname;
    private Boolean createdNow;

    public static UserDto toUserDto(Member member){
        return UserDto.builder()
                .id(member.getId())
                .nickname(member.getNickname())
                .build();
    }
}
