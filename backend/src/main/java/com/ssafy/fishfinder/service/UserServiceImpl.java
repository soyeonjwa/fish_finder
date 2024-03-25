package com.ssafy.fishfinder.service;

import com.ssafy.fishfinder.dto.OauthDto;
import com.ssafy.fishfinder.dto.UserDto;
import com.ssafy.fishfinder.entity.mysql.Member;
import com.ssafy.fishfinder.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final MemberRepository memberRepository;

    @Override
    public UserDto.Response getMember(OauthDto userInfo) {
        Member member = findMember(userInfo);
        if (member == null){ // 신규 회원
            member = userInfo.toEntity();
            memberRepository.save(member);
        }
        return UserDto.toResponse(member);
    }

    @Override
    public UserDto.Response getMember(UserDto userInfo) {
        return null;
    }

    @Override
    public Member findMember(OauthDto userInfo) {
        Member member = memberRepository.findByEmail(userInfo.getEmail());
        return member;
    }

    @Override
    public Member findMember(UserDto userInfo) {
        return null;
    }

    @Override
    public UserDto updateMember(Long id) {
        return null;
    }
}
