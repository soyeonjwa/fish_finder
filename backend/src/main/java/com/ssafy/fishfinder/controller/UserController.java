package com.ssafy.fishfinder.controller;

import com.ssafy.fishfinder.controller.constants.Message;
import com.ssafy.fishfinder.dto.OauthDto;
import com.ssafy.fishfinder.dto.UserDto;
import com.ssafy.fishfinder.exception.CustomException;
import com.ssafy.fishfinder.exception.ErrorCode;
import com.ssafy.fishfinder.service.UserService;
import com.ssafy.fishfinder.service.OauthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final OauthService oauthService;
    private final UserService userService;

    @GetMapping("/login")
    public ResponseEntity<Message> UserLogIn(@RequestParam String code, HttpServletRequest request){
        OauthDto userInfo = oauthService.getUserInfo(code);
        UserDto userDto = userService.getMember(userInfo);

        HttpSession session = request.getSession();
        session.setAttribute("id", userDto.getId());
        session.setAttribute("nickname", userDto.getNickname());

        if (userDto.getCreatedNow() == true){
            Message message = new Message("회원가입 완료", userDto);
            return new ResponseEntity(message, HttpStatus.CREATED);
        }
        Message message = new Message("로그인 완료", userDto);
        return ResponseEntity.ok(message);
    }

    @PatchMapping("/update")
    public ResponseEntity<Message> UserUpdate(@RequestBody UserDto userDto, HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if(session == null) {
            throw new CustomException(ErrorCode.NO_LOGIN);
        }
        Long id = (Long) session.getAttribute("id");
        userDto.setId(id);
        UserDto newUserDto = userService.updateMember(userDto);

        session.setAttribute("nickname", newUserDto.getNickname());

        Message message = new Message("닉네임 수정 완료", newUserDto);
        return ResponseEntity.ok(message);
    }

    @GetMapping("/logout")
    public ResponseEntity<Message> UserLogout(HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if(session == null) {
            throw new CustomException(ErrorCode.NO_LOGIN);
        }
        session.invalidate();

        Message message = new Message("로그아웃 완료");
        return ResponseEntity.ok(message);
    }

    @DeleteMapping("/signout")
    public ResponseEntity<Message> UserSignOut(HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if(session == null) {
            throw new CustomException(ErrorCode.NO_LOGIN);
        }
        Long id = (Long) session.getAttribute("id");
        userService.deleteMember(id);
        session.invalidate();

        Message message = new Message("회원탈퇴 완료");
        return ResponseEntity.ok(message);
    }
}
