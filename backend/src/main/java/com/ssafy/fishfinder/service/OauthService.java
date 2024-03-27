package com.ssafy.fishfinder.service;

import com.ssafy.fishfinder.dto.OauthDto;

public interface OauthService {

    OauthDto getUserInfo(String code);

    /**
     * 카카오 서버에 인가 코드를 전송하여 accessToken을 발급받는다.
     *
     * @param code : 프론트에서 전달 받은 인가 코드
     * @return accessToken : 카카오에서 발급 받은 accessToken
     */
    String requestAccessToken(String code);

    /**
     * 카카오 서버에 엑세스 토근을 전송하여 유저정보를 받아온다.
     *
     * @param accessToken // 카카오에서 발급받은 accessToken
     * @return userInfo // 카카오에서 가져온 유저 정보로 만든 dto
     */
    OauthDto requestUserInfo(String accessToken);
}
