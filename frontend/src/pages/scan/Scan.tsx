import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Sheet from "react-modal-sheet";
import { useNavigate } from "react-router-dom";

import BackButton from "../../components/common/BackButton";
import ScanBox from "../../components/scan/ScanFishBox";
import Loading from "../../components/common/Loading";
import CameraButton from "../../assets/icons/scanCamera.png";
import RetryButton from "../../assets/icons/scanRetry.png";
import { gray3, gray5 } from "../../assets/styles/palettes";

// import data from "../../services/dummy/Fish.json";
// import boxdata from "../../services/dummy/fishScan.json";

import { axiosInstance } from "../../services/axios";
import { AxiosResponse } from "axios";

interface FishScanData {
  class: number;
  class_name: string;
  confidence: number;
  bbox: number[];
}

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  font-family: Pretendard;
`;

const Header = styled.div`
  padding: 0 5% 0 5%;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  & > span {
    font-size: 22px;
    font-weight: bold;
  }
`;

const Contents = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VideoBox = styled.div`
  width: 100%;
  height: 75vh;
  position: relative;

  /* & > video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  } */
`;

const ScanButton = styled.img`
  position: absolute;
  width: 70px;
  height: 70px;
  bottom: 15%;
`;

const Info = styled.div`
  display: flex;
  height: 10vh;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > span {
    font-size: 15px;
    color: ${gray3};
  }
`;

const FishInfo = styled.div`
  display: flex;
  width: 90%;
  height: 80vh;
  margin: 0 5% 0 5%;
  flex-direction: column;
  align-items: center;
  font-family: Pretendard;

  & > p {
    font-size: 18px;
    font-weight: bold;
  }
`;

const Image = styled.img`
  height: 15vh;
  /* width: 80%;
  object-fit: cover; */
  margin-bottom: 10px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  border-bottom: 1px solid ${gray3};
  color: ${gray5};
  padding: 8px;
  text-align: center;
`;

const Td = styled.td`
  color: ${gray5};
  padding: 8px;
  text-align: center;
`;

export default function Scan() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const photoRef = useRef<HTMLCanvasElement>(null);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [boxdata, setBoxData] = useState<FishScanData[]>([]);
  const [loading, setLoading] = useState(false);
  const video = videoRef.current;
  const photo = photoRef.current;
  useEffect(() => {
    if (video && photo) {
      const resizeCanvas = () => {
        photo.width = video.videoWidth;
        photo.height = video.videoHeight;
      };

      window.addEventListener("resize", resizeCanvas);
      resizeCanvas();

      return () => {
        window.removeEventListener("resize", resizeCanvas);
      };
    }
  }, []);

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
          video.oncanplay = () => {
            video.play().catch((error) => {
              console.error("Failed to play video:", error);
            });
          };
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
    setLoading(true);
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
    photo.width = video.getBoundingClientRect().width;
    photo.height = video.getBoundingClientRect().height;
    const tempWidth = (video.videoHeight * photo.width) / photo.height;
    context.drawImage(
      video,
      (video.videoWidth - tempWidth) / 2,
      0,
      tempWidth,
      video.videoHeight,
      0,
      0,
      photo.width,
      photo.height
    );

    video.pause();
    // canvas에서 이미지 데이터 가져오기 (예: PNG 형식)
    const imageData = photo.toDataURL("image/png");
    const base64Data = imageData.split(",")[1];
    console.log(imageData);
    console.log(base64Data); // 이 데이터를 사용하거나 저장

    //data 백으로 보내기
    axiosInstance
      .post("/ai/fishes", {
        photoStr: base64Data,
      })
      .then((res: AxiosResponse) => {
        console.log(res.data[0]);
        setLoading(false);
        setBoxData(res.data[0]);
      })
      .catch((error) => {
        throw new Error(error.message);
      });

    setPhotoTaken(true);
  };

  useEffect(() => {
    getVideo();
  }, []);

  const [fishdata, setFishData] = useState({
    name: "",
    otherPrice: 0,
    ourPrice: 0,
    imgUri: "",
    fishId: 0,
  });

  const reTakePhoto = () => {
    setPhotoTaken(false);
    getVideo();
    setBoxData([]);
  };

  const OpenSheet = (fishId: number) => {
    axiosInstance.get(`/api/fishes/${fishId}`).then((res: AxiosResponse) => {
      setFishData(res.data.data);

      setOpen(true);
    });
  };

  const [isOpen, setOpen] = useState(false);
  // const ref = useRef<SheetRef>();
  const navigate = useNavigate();

  const handleSnap = (snapIndex: number) => {
    if (snapIndex === 0) {
      // 페이지 이동
      navigate(`/info/${fishdata.fishId}`);
    }
  };

  const navigateBack = () => {
    video?.pause();
    navigate(-1);
  };

  const Percentage = (num: number) => {
    return (num * 100).toFixed(2);
  };

  return (
    <Wrapper>
      <Header>
        <BackButton
          onClickBtn={() => {
            navigateBack();
          }}
        ></BackButton>
        <span>어종검색</span>
        <div style={{ width: "7%" }}></div>
      </Header>

      <Contents>
        <VideoBox>
          <video
            ref={videoRef}
            style={{
              display: photoTaken ? "none" : "block",
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
          ></video>
          <canvas
            ref={photoRef}
            style={{
              display: photoTaken ? "block" : "none",
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          ></canvas>
          {loading ? <Loading /> : null}
          {boxdata &&
            boxdata.map((data, index) => (
              <ScanBox
                key={index}
                class_name={data.class_name}
                x={data.bbox[0] - data.bbox[2] / 2}
                y={data.bbox[1] - data.bbox[3] / 2}
                width={data.bbox[2] * 1}
                height={data.bbox[3] * 1}
                confidence={Percentage(data.confidence)}
                onClickScanBox={() => {
                  OpenSheet(data.class);
                }}
              ></ScanBox>
            ))}
        </VideoBox>
        <ScanButton
          style={{ display: photoTaken ? "none" : "block" }}
          src={CameraButton}
          onClick={takePhoto}
        ></ScanButton>
        <ScanButton
          style={{ display: photoTaken ? "block" : "none" }}
          src={RetryButton}
          onClick={reTakePhoto}
        ></ScanButton>

        <Info>
          <span>물고기를 촬영하여</span> <span>정보와 시세를 확인하세요</span>
        </Info>

        <Sheet
          isOpen={isOpen}
          onClose={() => setOpen(false)}
          detent="content-height"
          snapPoints={[1200, 800]}
          onSnap={handleSnap}
          initialSnap={1}
        >
          <Sheet.Container>
            <Sheet.Header />
            <Sheet.Content>
              <FishInfo>
                <Image src={fishdata.imgUri} />
                <p>{fishdata.name}</p>
                <Table>
                  <thead>
                    <tr>
                      <Th></Th>
                      <Th>
                        <span>타사이트</span>
                      </Th>
                      <Th>
                        물어바종
                        <br />
                        평균거래가
                      </Th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <Td>1kg 당</Td>
                      <Td> {fishdata.otherPrice}원~</Td>
                      <Td> {fishdata.ourPrice}원~</Td>
                    </tr>
                  </tbody>
                </Table>
              </FishInfo>
            </Sheet.Content>
          </Sheet.Container>
          <Sheet.Backdrop />
        </Sheet>
      </Contents>
    </Wrapper>
  );
}
