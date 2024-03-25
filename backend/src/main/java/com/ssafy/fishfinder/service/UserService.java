package com.ssafy.fishfinder.service;

import com.ssafy.fishfinder.dto.OauthDto;
import com.ssafy.fishfinder.dto.UserDto;
import com.ssafy.fishfinder.entity.mysql.Member;

public interface UserService {

    /**
     * 미가입된 유저일경우 db에 저장
     * 
     * @param userInfo 카카오 유저 정보 dto
     * @return userDto의 response 객체
     */
    UserDto.Response getMember(OauthDto userInfo);
    
    UserDto.Response getMember(UserDto userInfo);

    /**
     * 카카오 유저정보로 회원 조회
     *
     * @param userInfo 카카오 유저 정보 dto
     * @return Member entity or NULL
     */
    Member findMember(OauthDto userInfo);

    Member findMember(UserDto userInfo);

    UserDto updateMember(Long id);
}
