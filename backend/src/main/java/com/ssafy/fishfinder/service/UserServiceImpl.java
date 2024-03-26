package com.ssafy.fishfinder.service;

import com.ssafy.fishfinder.dto.OauthDto;
import com.ssafy.fishfinder.dto.UserDto;
import com.ssafy.fishfinder.entity.mysql.Member;
import com.ssafy.fishfinder.exception.CustomException;
import com.ssafy.fishfinder.exception.ErrorCode;
import com.ssafy.fishfinder.repository.mysql.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final MemberRepository memberRepository;

    /**
     * 카카오 유저정보로 회원 조회
     * 미가입된 유저일경우 회원 가입
     *
     * @param userInfo 카카오 유저 정보 dto
     * @return userDto
     */
    @Override
    public UserDto getMember(OauthDto userInfo) {
        Member member = memberRepository.findByEmail(userInfo.getEmail());
        if (member == null){ // 신규 회원
            member = userInfo.toEntity();
            memberRepository.save(member);
        }
        return UserDto.toUserDto(member);
    }

    /**
     * nickname 변경
     * 
     * @param userDto
     * @return 변경된 userDto
     */
    @Override
    public UserDto updateMember(UserDto userDto) {
        Member member = memberRepository.findById(userDto.getId()).orElseThrow(() -> new CustomException(ErrorCode.NO_MEMBER));
        member.updateNickname(userDto.getNickname());
        memberRepository.save(member);
        return UserDto.toUserDto(member);
    }

    @Override
    public UserDto getMember(UserDto userdto) {
        return null;
    }
}
