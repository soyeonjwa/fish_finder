package com.ssafy.fishfinder.controller;

import com.ssafy.fishfinder.controller.constants.Message;
import com.ssafy.fishfinder.dto.OauthDto;
import com.ssafy.fishfinder.dto.UserDto;
import com.ssafy.fishfinder.service.UserService;
import com.ssafy.fishfinder.service.OauthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final OauthService oauthService;
    private final UserService userService;

    @ResponseBody
    @GetMapping("/login")
    public ResponseEntity<Message> logIn(@RequestParam String code, HttpServletRequest request){
        OauthDto userInfo = oauthService.getUserInfo(code);
        UserDto.Response responseDto = userService.getMember(userInfo);

        HttpSession session = request.getSession();
        session.setAttribute("id", responseDto.getId());
        session.setAttribute("nickname", responseDto.getNickname());

        Message message = new Message("로그인 완료");
        return ResponseEntity.ok(message);
    }

}
