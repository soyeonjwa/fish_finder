from fastapi import FastAPI
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

model_path = './model/best.pt'
model = YOLO(model_path)
model.info()


@app.post("/ai/fishes")
async def predict(photo: Photo):
    image = base64_to_image(photo.photoStr)
    results = model.predict(source=image, conf=0.5)

    json_result = results_to_json(results)
    return json_result


def results_to_json(results):
    return [
        [
            {
                "class": int(pred.cls),
                "class_name": model.model.names[int(pred.cls)],
                "bbox": [float(x) for x in pred.xywh.tolist()[0]],
                "confidence": float(pred.conf)
            }
            for pred in result.boxes
        ]
        for result in results
    ]
