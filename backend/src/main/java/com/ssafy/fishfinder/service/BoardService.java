package com.ssafy.fishfinder.service;

import com.ssafy.fishfinder.dto.BoardDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BoardService {
    BoardDto.CreateResponse createBoard(BoardDto.CreateRequest request, List<MultipartFile> images);
}
