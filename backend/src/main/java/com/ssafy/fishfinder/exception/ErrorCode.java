package com.ssafy.fishfinder.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ErrorCode {
    NO_EXIST(400, "조회할 항목이 없습니다."),
    NO_MEMBER(400, "회원이 존재하지 않습니다."),
    NO_BOARD(400, "게시글이 존재하지 않습니다.");
    private final int status;
    private final String message;

}
