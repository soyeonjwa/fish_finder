# 부모 이미지 지정
FROM node:20.10.0
# 작업 디렉토리 생성
WORKDIR /usr/src/app
# yarn 설치
COPY package*.json ./
RUN yarn install
RUN yarn global add serve
# 소스 추가
COPY . .
RUN yarn build

# 실행 명령
CMD [ "serve", "-s", "build" ]
