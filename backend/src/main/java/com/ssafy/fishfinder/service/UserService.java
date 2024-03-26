package com.ssafy.fishfinder.service;

import com.ssafy.fishfinder.dto.OauthDto;
import com.ssafy.fishfinder.dto.UserDto;
import com.ssafy.fishfinder.entity.mysql.Member;

public interface UserService {

    UserDto getMember(OauthDto userInfo);

    UserDto updateMember(UserDto userDto);

    UserDto getMember(UserDto userDto);



}
