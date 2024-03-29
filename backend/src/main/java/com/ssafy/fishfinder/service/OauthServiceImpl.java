package com.ssafy.fishfinder.service;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.ssafy.fishfinder.controller.constants.Message;
import com.ssafy.fishfinder.dto.OauthDto;
import com.ssafy.fishfinder.exception.CustomException;
import com.ssafy.fishfinder.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

@Service
@RequiredArgsConstructor
public class OauthServiceImpl implements OauthService{

    @Value("${kakao.clientId}")
    private String clientId;
    @Value("${kakao.redirectUrl}")
    private String redirectUrl;

    @Override
    public OauthDto getUserInfo(String code) {
        String accessToken = requestAccessToken(code);
        return requestUserInfo(accessToken);
    }

    @Override
    public String requestAccessToken(String code) {

        String accessToken = "";
        String refreshToken = "";
        String reqUrl = "https://kauth.kakao.com/oauth/token";

        /**
         * 카카오 서버와 Http 통신한다.
         */
        try {
            /**
             * 요청
             */
            URL url = new URL(reqUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setDoOutput(true); // 전송할 데이터가 있는 경우 true

            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id=" + clientId);
            sb.append("&redirect_uri=" + redirectUrl);
            sb.append("&code=" + code);
            bw.write(sb.toString());
            bw.flush();

            /**
             * 응답
             */
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null){
                result += line;
            }
            System.out.println("response body : " + result);

            int responseCode = conn.getResponseCode();
            if (responseCode != 200) {
                Message message = new Message(result);
                throw new CustomException(ErrorCode.WRONG_CODE);
            }
//            System.out.println("responseCode : " + responseCode);
            JsonParser parser = new JsonParser(); // Gson 라이브러리
            JsonElement element = parser.parse(result);

            accessToken = element.getAsJsonObject().get("access_token").getAsString();
//            refreshToken = element.getAsJsonObject().get("refresh_token").getAsString();

//            System.out.println("accessToken : " + accessToken);
//            System.out.println("refreshToken : " + refreshToken);

            br.close();
            bw.close();

        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return accessToken;
    }


    @Override
    public OauthDto requestUserInfo(String accessToken) {
        String reqUrl = "https://kapi.kakao.com/v2/user/me";
        Long id = 0L;
        String nickname = "";
        String email = "";

        /**
         * 카카오 서버와 Http 통신한다.
         */
        try {
            /**
             * 요청
             */
            URL url = new URL(reqUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");

            // 요청 Header에 내용 추가
            conn.setRequestProperty("Authorization", "Bearer " + accessToken);

            /**
             * 응답
             */
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

            String line = "";
            String result = "";

            while ((line = br.readLine()) != null){
                result += line;
            }
//            System.out.println("response body : " + result);

            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            JsonObject properties = element.getAsJsonObject().get("properties").getAsJsonObject();
            nickname = properties.getAsJsonObject().get("nickname").getAsString();

            JsonObject kakaoAccount = element.getAsJsonObject().get("kakao_account").getAsJsonObject();
            email = kakaoAccount.getAsJsonObject().get("email").getAsString();

            br.close();

        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        OauthDto userInfo = OauthDto.builder()
                .nickname(nickname)
                .email(email)
                .build();
        return userInfo;
    }

}
