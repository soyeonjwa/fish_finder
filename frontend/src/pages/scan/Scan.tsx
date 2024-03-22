import React, { useRef } from "react";
import styled from "styled-components";

import CameraButton from "../../assets/icons/scanCamera.png";
const Wrapper = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  height: 60px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  & > span {
    font-size: 18px;
    font-weight: bold;
  }
`;

const ScanButton = styled.img`
  width: 50px;
  height: 50px;
  margin-top: 10px;
  margin-left: 10px;
`;

export default function Scan() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const photoRef = useRef<HTMLCanvasElement>(null);

  const getVideo = () => {
    // 미디어 설정에서 후면 카메라를 지정
    const constraints = {
      video: { facingMode: "environment" },
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        // video 태그의 소스로 스트림을 지정
        const video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          video.play();
        } else {
          console.error("Video element not found.");
        }
      })
      .catch((err) => {
        console.error("카메라에 접근할 수 없습니다.", err);
      });
  };

  // 사진 찍기
  const takePhoto = () => {
    const video = videoRef.current;
    const photo = photoRef.current;

    if (!video) {
      console.error("Video element not found.");
      return;
    }

    if (!photo) {
      console.error("Photo element not found.");
      return;
    }

    const context = photo.getContext("2d");

    // Ensure context is not null
    if (!context) {
      console.error("캔버스 컨텍스트를 찾을 수 없습니다.");
      return;
    }

    // video의 크기에 맞게 canvas 크기를 조절
    photo.width = video.videoWidth;
    photo.height = video.videoHeight;
    context.drawImage(video, 0, 0, photo.width, photo.height);

    // canvas에서 이미지 데이터 가져오기 (예: PNG 형식)
    const imageData = photo.toDataURL("image/png");
    console.log(imageData); // 이 데이터를 사용하거나 저장
  };

  getVideo();
  return (
    <Wrapper>
      <Header>
        <span>어종 스캔</span>
      </Header>
      <video ref={videoRef}></video>
      {/* <button onClick={getVideo}>카메라 시작</button> */}
      <ScanButton src={CameraButton} onClick={takePhoto}></ScanButton>
      <canvas ref={photoRef} style={{ display: "none" }}></canvas>
    </Wrapper>
  );
}
