from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
import base64
from pydantic import BaseModel
import cv2
import numpy as np


class Photo(BaseModel):
    photoStr: str


def base64_to_image(base64_string):
    # base64 문자열을 디코딩하여 이미지로 변환
    decoded_data = base64.b64decode(base64_string)
    np_data = np.frombuffer(decoded_data, np.uint8)
    image = cv2.imdecode(np_data, cv2.IMREAD_COLOR)

    return image


app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "https://test.fishfinder.site",
    "https://fishfinder.site",
    "http://test.fishfinder.site",
    "http://fishfinder.site",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

fishList = {
    0: {'fish_id': 1, 'fish_name': '광어'},
    1: {'fish_id': 5, 'fish_name': '우럭'},
    2: {'fish_id': 6, 'fish_name': '참돔'},
    3: {'fish_id': 7, 'fish_name': '감성돔'},
    4: {'fish_id': 8, 'fish_name': '돌돔'},
    5: {'fish_id': 9, 'fish_name': '강담돔'},
    6: {'fish_id': 10, 'fish_name': '농어'},
    7: {'fish_id': 13, 'fish_name': '자바리'},
    8: {'fish_id': 14, 'fish_name': '능성어'},
    9: {'fish_id': 15, 'fish_name': '붉바리'},
    10: {'fish_id': 16, 'fish_name': '벵에돔'},
    11: {'fish_id': 18, 'fish_name': '복어'},
    12: {'fish_id': 19, 'fish_name': '숭어'},
    13: {'fish_id': 21, 'fish_name': '방어'},
    14: {'fish_id': 24, 'fish_name': '흑점줄전갱이'},
    15: {'fish_id': 12, 'fish_name': '점성어'},
}


model_path = './model/best.pt'
model = YOLO(model_path)
model.info()


@app.post("/ai/fishes")
async def predict(photo: Photo):

    image = base64_to_image(photo.photoStr)
    results = model.predict(source=image, augment=True, conf=0.65, imgsz=1024)

    json_result = results_to_json(results)
    return json_result


def results_to_json(results):
    return [
        [
            {
                "class": fishList[int(pred.cls)]['fish_id'],
                "class_name": fishList[int(pred.cls)]['fish_name'],
                "bbox": [float(x) for x in pred.xywh.tolist()[0]],
                "confidence": float(pred.conf)
            }
            for pred in result.boxes
        ]
        for result in results
    ]
