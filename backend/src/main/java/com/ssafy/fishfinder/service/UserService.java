package com.ssafy.fishfinder.service;

import com.ssafy.fishfinder.dto.OauthDto;
import com.ssafy.fishfinder.dto.UserDto;

public interface UserService {

    UserDto getMember(OauthDto userInfo);

    UserDto updateMember(UserDto userDto);

    void deleteMember(Long id);

}
