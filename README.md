# 📖 AI기반 물고기 정보 조회 서비스 "물어바종"

![readme_title_img](https://test.fishfinder.site/static/media/mainLogo.37274a00f4d4e3c707c2.png)

- 배포 URL : https://fishfinder.site

<br>

## 프로젝트 소개

- 물어바종은 AI를 이용하여 물고기를 검색하고 유사한 어종을 비교할 수 있는 서비스입니다.
- 카메라를 통해 물고기의 사진을 찍으면 AI모델이 종을 분류하여 해당 물고기의 정보와 유사 어종의 정보를 나타내줍니다.
- 게시판을 통해 유저들은 본인이 수산시장에서 구매한 내역의 글을 올리거나 다른 사람이 방문한 리뷰나 게시글을 읽을 수 있습니다.
- 시세 페이지에서는 게시판에 남긴 리뷰와 타사이트의 가격 정보의 크롤링을 통해 시세의 흐름을 알 수 있습니다.

<br>

## 팀원 구성

<div align="center">

| **조다민** | **박태양** | **이병수** | **이영서** | **좌소연** | **최원재** |
| :------: |  :------: | :------: | :------: | :------: | :------: |
| [<img src="" height=150 width=150> <br/> @조다민아이디]() | [<img src="" height=150 width=150> <br/> @박태양아이디]() | [<img src="" height=150 width=150> <br/> @이병수아이디]() | [<img src="" height=150 width=150> <br/> @이영서아이디]() | [<img src="" height=150 width=150> <br/> @좌소연아이디]() | [<img src="" height=150 width=150> <br/> @최원재아이디]() |
| 팀장<br> AI | FE | BE | INFRA | FE | BE |
</div>

<br>

## 1. 개발 환경 및 기술 스택

### Front-End
<img src="https://img.shields.io/badge/React-61DAFB?logo=React&logoColor=white">
<img src="https://img.shields.io/badge/Styled Components-DB7093?logo=styledcomponents&logoColor=white">
<img src="https://img.shields.io/badge/Css-1572B6?logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/Zustand-0082F0?logoColor=white">

### Back-End
<img src="https://img.shields.io/badge/Spring boot-6DB33F?logo=springboot&logoColor=white">
<img src="https://img.shields.io/badge/JPA-F37143?logoColor=white">
<img src="https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white">

### Database
<img src="https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white">
<img src="https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white">

### AI
<img src="https://img.shields.io/badge/Jupyter-F37626?logo=jupyter&logoColor=white">
<img src="https://img.shields.io/badge/Pytorch-EE4C2C?logo=pytorch&logoColor=white">
<img src="https://img.shields.io/badge/YOLO-v8-29F1FB?logo=yolo&logoColor=white">

### 버전 및 이슈관리
<img src="https://img.shields.io/badge/Gitlab-FC6D26?logo=gitlab&logoColor=white">
<img src="https://img.shields.io/badge/Jira-0052CC?logo=jira&logoColor=white">

### 협업 툴
<img src="https://img.shields.io/badge/Mattermost-0058CC?logo=mattermost&logoColor=white">

### CI/CD
<img src="https://img.shields.io/badge/Amazon EC2-FF9900?logo=amazonec2&logoColor=white">
<img src="https://img.shields.io/badge/Amazon S3-569A31?logo=amazons3&logoColor=white">
<img src="https://img.shields.io/badge/Jenkins-D24939?logo=jenkins&logoColor=white">
<img src="https://img.shields.io/badge/docker-2496ED?logo=docker&logoColor=white">

### 디자인
<img src="https://img.shields.io/badge/Figma-F24E1E?logo=figma&logoColor=white">
<br>

![tech_stack](https://fish-finder.s3.ap-northeast-2.amazonaws.com/etc/%EB%AC%BC%EC%96%B4%EB%B0%94%EC%A2%85_%EA%B8%B0%EC%88%A0%EC%8A%A4%ED%83%9D.png)

## 2. 프로젝트 구조

<details>
<summary><h3>Springboot</h3></summary>

```
├─main
│  ├─java
│  │  └─com
│  │      └─ssafy
│  │          └─fishfinder
│  │              ├─config
│  │              ├─controller
│  │              │  └─constants
│  │              ├─dto
│  │              ├─entity
│  │              │  ├─mongo
│  │              │  └─mysql
│  │              ├─exception
│  │              ├─repository
│  │              │  ├─mongo
│  │              │  └─mysql
│  │              ├─service
│  │              └─util
│  └─resources
└─test
    └─java
        └─com
            └─ssafy
                └─fishfinder
```

</details>
<details>
<summary><h3>React</h3></summary>

```
├─@types
│  └─globals
├─assets
│  ├─icons
│  ├─images
│  │  ├─fishcard    
│  │  ├─market      
│  │  └─tutorial    
│  └─styles
│      └─font       
├─components        
│  ├─board
│  │  ├─detail      
│  │  └─register    
│  ├─common
│  │  └─board       
│  ├─info
│  │  └─modal       
│  ├─main
│  ├─marketCondition
│  ├─scan
│  └─search
├─pages
│  ├─board
│  │  ├─detail      
│  │  └─register    
│  ├─info
│  ├─login
│  ├─main
│  ├─marketCondition
│  ├─myPage
│  ├─scan
│  ├─search
│  └─tutorial
├─services
│  ├─board
│  ├─dummy
│  └─mypage
└─stores
```

</details>
<details>
<summary><h3>FastAPI</h3></summary>

```
└─main
   └─model
```

</details>
<br>

## 3. 서비스 아키텍처
![architecture](https://fish-finder.s3.ap-northeast-2.amazonaws.com/etc/%EB%AC%BC%EC%96%B4%EB%B0%94%EC%A2%85_%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98.png)

## 4. ERD
![erd](https://fish-finder.s3.ap-northeast-2.amazonaws.com/etc/%EB%AC%BC%EC%96%B4%EB%B0%94%EC%A2%85_erd.png)

## 5. 역할 분담

### 🍊조다민(팀장)

- **AI**
    - 모델 학습

<br>
    
### 👻박태양

- **FE**
    - 메인페이지

<br>

### 😎이병수

- **BE**
    - 회원기능
        - 회원 가입, 탈퇴, 수정 구현 
        - 카카오 AUTH 구현

<br>

### 🐬이영서

- **Infra**
    - Jenkins CI/CD 구축
<br>

### 🐬좌소연

- **FE**
    - 게시판
<br>

### 🐬최원재

- **BE**
    - 게시판
<br>

## 6. 개발 기간 및 작업 관리

### 개발 기간

- 전체 개발 기간 : 2024-02-26 ~ 2024-04-03
- 기획 및 설계 : 2024-02-26 ~ 2024-03-10
- 기능 구현 : 2024-03-11 ~ 2024-03-27
- 테스트 및 수정 : 2024-03-28 ~ 2024-04-03

<br>

## 7. 페이지별 기능

### [메인화면]
- 서비스 메인 화면으로 이번달 제철 물고기 정보와 인기 게시글을 보여줍니다.
  - 로그인이 되어 있지 않은 경우 : 왼쪽 위에 '안녕하세요'
	- 로그인이 되어 있는 경우 : 왼쪽 위에 회원 닉네임
- 우측 상단 돋보기 클릭시 물고기 검색 페이지로 이동합니다.
- 우측 상단 스캔 메뉴 클릭시 물고기 스캔 페이지로 이동합니다.
- 제철 횟감은 이번달 제철인 물고기의 정보를 보여줍니다.
	- 클릭시 해당 물고기의 검색 페이지로 이동합니다.
- 인기 게시글은 최근 1주일 이내 가장 좋아요 수가 많은 글 4개를 보여줍니다.
	- 클릭시 해당 게시글로 이동합니다.
	- 게시글을 상세조회하기 위해서는 로그인이 필요합니다.

| 메인화면 |
|----------|
|![main](-- 추가예정 --)|

<br>

### [회원가입 및 로그인]
- 회원가입은 카카오 로그인으로만 가능합니다.
- 카카오 로그인 버튼을 눌러 회원가입 및 로그인을 진행합니다.
	- 회원가입이 되어 있지 않은 경우 : 카카오를 통해 회원가입을 진행합니다.
	- 회원가입이 되어 있을 경우 : 카카오를 통해 로그인을 진행합니다.
	
| 회원가입 |
|----------|
|![join](--추가예정--)|

<br>

### [물고기 스캔]
- 물고기 스캔 페이지에서는 사진을 찍어 물고기의 정보를 얻을 수 있습니다.
- 카메라를 이용해 물고기 사진을 찍습니다.
	- 물고기 사진의 분석 결과가 화면에 출력됩니다.
	- 각 물고기를 클릭하여 해당 물고기의 상세정보를 확인할 수 있습니다.
- 해당 기능은 로그인 없이 사용 가능합니다.

| 물고기 스캔 |
|----------|
|![fishScan](--추가예정--)|

<br>

### [물고기 검색]
- 물고기 검색 페이지에서는 서비스에 등록된 물고기의 정보를 검색 할 수 있습니다.
- 최근 검색어종은 사용자가 최근에 검색한 물고기를 보여줍니다.
- 추천 검색어종은 이번달 제철 물고기의 이름을 보여줍니다.

| 물고기 검색 |
|----------|
|![fishSearch]()|

<br>

### [물고기 상세 조회]
- 이름으로 물고기를 조회한 결과를 보여줍니다.
- 원하는 물고기를 클릭하면 해당 물고기의 상세정보로 이동합니다.
- 물고기의 특징과 정보를 보여줍니다.
- 대략적인 시세를 보여줍니다.
	- 어제 거래된 타사이트 시세와 우리 사이트의 리뷰정보를 보여줍니다.
	- 물어봐종 시세를 눌러 물고기 시세 조회로 이동합니다.
- 비슷한 유사 어종을 보여줍니다.
	- 유사 어종을 클릭시 두 어종의 차이점을 비교해줍니다.

| 물고기 상세 조회 |
|----------|
|![fishDetail]()|

<br>

### [물고기 시세 조회]
- 시세 그래프 : 타 사이트와 우리 사이트 리뷰를 통해 시세 그래프를 보여줍니다.
		- 1주일 : 최근 1주일의 시세 그래프를 보여줍니다.
		- 1개월 : 최근 1개월의 주별 평균 시세 그래프를 보여줍니다.
		- 6개월 : 최근 6개월의 월별 평균 시세 그래프를 보여줍니다.
- kg당 가격 : 어제 타 사이트의 시세 정보를 보여줍니다.
- 유저가 올린 리뷰를 통해 거래 내역을 보여줍니다.

| 물고기 시세 조회 |
|----------|
|![fishPrice]()|

<br>

### [게시판 조회]
- 게시판을 통해 유저가 구입한 '리뷰글' 이나 '일반글'을 조회할 수 있습니다.
- 검색 기능을 통해 해당 단어를 포함하는 제목을 가지는 글을 조회합니다.
- 정렬 기능을 통해 게시판을 정렬합니다.
	- 최신순 : 글을 작성된 최신순으로 정렬합니다.
	- 인기순 : 글을 좋아요가 많은 순으로 정렬합니다.
	- 리뷰만보기 : 리뷰글을 작성된 최신순으로 정렬합니다.
	- 리뷰인기글 : 리뷰글을 좋아요가 많은 순으로 정렬합니다.
- 글을 클릭하여 해당 글 상세보기로 이동합니다.
	- 로그인 되어 있을 경우 : 해당 글로 이동합니다.
	- 로그인 되어 있지 않을 경우 : 로그인 페이지로 이동합니다.

| 게시판 조회 | 인기순 조회 |
|----------|----------|
|![boardSearch]()|![boardPopular]()|

<br>

### [게시글 상세조회]
- 유저가 작성한 게시글을 조회합니다.
	- 다른 유저가 작성한 댓글을 조회합니다.
- 리뷰 게시글 : 유저가 기록한 물고기 시세 정보를 보여줍니다.
- 좋아요 : 해당 글을 '좋아요' 합니다.
- 스크랩 : 해당 글을 '스크랩' 합니다.
- 댓글 : 해당 글에 댓글을 작성합니다.

| 게시글 상세조회(일반) | 게시글 상세조회(리뷰) |
|----------|----------|
|![normal]()|![review]()|

<br>

### [마이페이지]
- 내가 작성한 글, 댓글 수, 스크랩한 수를 보여줍니다.
- 탭을 클릭하여 내가 작성한 글 목록, 작성한 댓글 목록, 스크랩 목록을 보여줍니다.
- 로그아웃 버튼을 눌러 로그아웃할 수 있습니다.

| 게시글 상세조회(일반) |
|----------|
|![mypage]()|

<br>

## 9. 개선 

- 모델 고도화
	- 현재 모델의 정확도를 향상 시키기 위한 데이터셋 정비
- 대상 어종 확대
	- 현재 대상 어종 외 추가 어종 정보 입력
- 시장 별 시세 지원
	- 현재 시세는 노량진 수산시장 기준으므로 추가 시장정보 입력
- 사진 업로드 기능 추가
	- 현재는 사진을 찍어야만 작동, 사진을 업로드 하는 기능 추가
- ios 사진 촬용 기능 개선
	- ios로 촬영시 live?로 작동하는 이슈가 있음
    
<br>

## 10. 프로젝트 후기

### 🍊 조다민

-- 조다민 후기 --

<br>

### 👻 박태양

-- 박태양 후기 --

<br>

### 😎 이병수

-- 이병수 후기 --

<br>

### 🐬 이영서

-- 이영서 후기 --

<br>

### 🐬 좌소연

-- 좌소연 후기 --

<br>

### 🐬 최원재

-- 최원재 후기 --
