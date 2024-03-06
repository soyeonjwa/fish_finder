package com.ssafy.fishfinder.exception;

import com.ssafy.fishfinder.controller.constants.Message;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@RestControllerAdvice
public class APIExceptionHandler {
    @ExceptionHandler({CustomException.class})
    protected ResponseEntity<Message> handleCustomException(CustomException ex){
        return new ResponseEntity<Message>(new Message(ex.getErrorCode().getMessage()), HttpStatusCode.valueOf(ex.getErrorCode().getStatus()));
    }
}


