package com.ssafy.fishfinder.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Optional;

public interface S3UploadService {
    String upload(MultipartFile multipartFile, String dirName, Long id) throws IOException;

    String upload(File uploadFile, String dirName, Long id);

    String putS3(File uploadFile, String fileName);

    void removeNewFile(File targetFile);

    Optional<File> convert(MultipartFile file) throws IOException;

    String uploadThumbnail(MultipartFile multipartFile, String dirName, Long id) throws IOException;
}
