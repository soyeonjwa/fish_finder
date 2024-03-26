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
    public ResponseEntity<Message> UserLogIn(@RequestParam String code, HttpServletRequest request){
        OauthDto userInfo = oauthService.getUserInfo(code);
        UserDto userDto = userService.getMember(userInfo);

        HttpSession session = request.getSession();
        session.setAttribute("id", userDto.getId());
        session.setAttribute("nickname", userDto.getNickname());

        Message message = new Message("로그인 완료");
        return ResponseEntity.ok(message);
    }

    @ResponseBody
    @PostMapping("/update")
    public ResponseEntity<Message> UserUpdate(@RequestBody UserDto userDto, HttpServletRequest request){
        HttpSession session = request.getSession();
        Long id = (Long) session.getAttribute("id");
        userDto.setId(id);
        userService.updateMember(userDto);

        session.setAttribute("nickname", userDto.getNickname());

        Message message = new Message("닉네임 수정 완료");
        return ResponseEntity.ok(message);
    }
}
