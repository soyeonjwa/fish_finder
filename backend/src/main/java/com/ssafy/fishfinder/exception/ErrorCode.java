package com.ssafy.fishfinder.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ErrorCode {
    NO_EXIST(400, "조회할 항목이 없습니다."),
    NO_MEMBER(400, "회원이 존재하지 않습니다."),
    NO_FISH(400, "어종이 존재하지 않습니다."),
    NO_FISH_DIFF(400, "어종 비교 정보가 존재하지 않습니다."),
    NO_FISH_GROUP(400, "어종 그룹이 존재하지 않습니다."),
    FILE_UPLOAD_ERROR(400, "파일 업로드에 실패하였습니다."),
    NO_BOARD(400, "게시글이 존재하지 않습니다."),
    NO_AUTHORITY(401, "권한이 없습니다"),
    NO_LOGIN(401, "로그인이 필요합니다."),
    NO_WRITER(400, "작성자가 일치하지 않습니다."),
    NO_COMMENT(400, "댓글이 존재하지 않습니다."),
    WRONG_CODE(400, "잘못된 인가코드 입니다.");
    private final int status;
    private final String message;

}
