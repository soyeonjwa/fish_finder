package com.ssafy.fishfinder.controller.constants;

import lombok.Data;
import lombok.Getter;

@Data
public class Message {
    private String message;
    private Object data;

    public Message() {
        this.data = null;
        this.message = null;
    }

    public Message(String message) { // 메세지만 있을 경우
        this.message = message;
        this.data = null;
    }

    public Message(String message, Object data) { // 메세지 데이터 모두 있는 경우
        this.message = message;
        this.data = data;
    }

}
