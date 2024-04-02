import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Sheet from "react-modal-sheet";
import { useNavigate } from "react-router-dom";

import BoardContainer from "../../components/common/board/BoardContainer";
import SearchBox from "../../components/common/SearchBox";
import { Button } from "../../components/common/Button";
import { primary, black } from "../../assets/styles/palettes";
import { Overlay } from "../../components/common/Overlay";
import { NavBarWrapper } from "../../components/common/Wrapper";
import { BoardType } from "../../components/common/board/BoardContainer";

import { axiosInstance } from "../../services/axios";
import { AxiosResponse } from "axios";
import { userStore } from "../../stores/userStore";

const StyledWrapper = styled(NavBarWrapper)<{ isOpen: boolean }>``;

const Header = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 90%;
  height: 70px;

  @media only screen and (max-width: 210px) {
    height: 50px;
  }

  @media only screen and (min-width: 375px) {
    height: 75px;
  }

  @media only screen and (min-width: 430px) {
    height: 85px;
  }

  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  z-index: 10;
`;

const MidContent = styled.div`
  padding-top: 70px;

  @media only screen and (max-width: 210px) {
    padding-top: 50px;
  }

  @media only screen and (min-width: 375px) {
    padding-top: 75px;
  }

  @media only screen and (min-width: 430px) {
    padding-top: 85px;
  }
`;

const RadioBox = styled.div`
  display: flex;
  justify-content: center;
  height: 50px;
  width: 100px;
`;

const RadioButton = styled.input`
  display: none;
`;

const RadioLabel = styled.label<{ bold: boolean }>`
  color: ${black};
  font-family: Pretendard;
  font-size: 19px;
  font-weight: ${({ bold }) => (bold ? "bold" : "normal")};
`;

const SheetContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const StyledButton = styled(Button)`
  position: fixed;
  bottom: 90px;
  right: 5%;
  border-radius: 20px;
  font-weight: 500;
`;

export default function Board() {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [sort, setSort] = useState("최신순");
  const [boards, setBoards] = useState<BoardType[]>([]);
  const [page, setPage] = useState(0);

  const { userId } = userStore();
  const navigate = useNavigate();

  const onClickRadio = (name: string) => {
    setSort(name);
    setIsOpen(!isOpen);
  };

  const onClickBtn = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axiosInstance
      .get(`/api/board?keyword=${value}`)
      .then((res: AxiosResponse) => {
        setBoards(res.data.data);
      });
  };

  const getBoards = async (url: string) => {
    console.log(url);
    await axiosInstance.get(url).then((res: AxiosResponse) => {
      const result: BoardType[] = res.data.data;
      setBoards((prevBoards) => [...prevBoards, ...result]);
    });
    return [];
  };

  const onClickRegisterBtn = () => {
    if (userId == -1) navigate("/login");
    else navigate("/board/register");
  };

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    console.log(boards);
  }, [boards]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0,
    });

    const observerTarget = document.getElementById("observer");

    if (observerTarget) {
      observer.observe(observerTarget);
    }

    axiosInstance.get("/api/board").then((res: AxiosResponse) => {
      setBoards(res.data.data);
    });
  }, []);

  useEffect(() => {
    if (boards.length <= 0) return;
    if (page == 0) return;

    let url: string = "/api/board";
    if (sort === "최신순") {
      url += "?sortBy=createdAt";
    } else if (sort === "인기순") {
      url += `?sortBy=likeCount&likeCount=${boards.at(boards.length - 1)?.likeCount}`;
    } else if (sort === "리뷰만") {
      url += "?sortBy=createdAt&postType=review";
    } else {
      url += `?sortBy=likeCount&postType=review&likeCount=${boards.at(boards.length - 1)?.likeCount}`;
    }

    url += `&createdAt=${boards.at(boards.length - 1)?.createdAt}`;

    getBoards(url);
  }, [page]);

  useEffect(() => {
    let url: string = "/api/board";
    if (sort === "최신순") {
      url += "?sortBy=createdAt";
    } else if (sort === "인기순") {
      url += "?sortBy=likeCount";
    } else if (sort === "리뷰만") {
      url += "?sortBy=createdAt&postType=review";
    } else {
      url += "?sortBy=likeCount&postType=review";
    }

    axiosInstance.get(url).then((res: AxiosResponse) => {
      setBoards(res.data.data);
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [sort]);

  return (
    <div>
      <StyledWrapper isOpen={isOpen}>
        {isOpen && <Overlay onClick={onClickBtn} />}
        <Header>
          <SearchBox
            width="73%"
            name="boardSearch"
            margin="5% 3% 5% 0"
            value={value}
            setValue={setValue}
            handleSubmit={(e: React.FormEvent<HTMLFormElement>) =>
              handleSubmit(e)
            }
            handleSearchClick={() => {}}
          ></SearchBox>
          <Button
            width="23%"
            height="auto"
            margin="5% 0 5% 0"
            padding="0% 3% 0% 3%"
            color={primary}
            border="1px solid #00116A"
            onClick={onClickBtn}
          >
            {sort === "리뷰인기순" ? (
              <span style={{ fontSize: "11px" }}>{sort} ▼</span>
            ) : (
              <span>{sort} ▼</span>
            )}
          </Button>
        </Header>
        <MidContent>
          <BoardContainer boards={boards}></BoardContainer>
          <div id="observer" style={{ height: "10px" }}></div>
        </MidContent>
      </StyledWrapper>
      <Sheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        detent="content-height"
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <SheetContents>
              <RadioBox>
                <RadioButton
                  type="radio"
                  id="last"
                  name="sort"
                  onClick={() => onClickRadio("최신순")}
                  defaultChecked
                ></RadioButton>
                <RadioLabel htmlFor="last" bold={sort === "최신순"}>
                  최신순
                </RadioLabel>
              </RadioBox>
              <RadioBox>
                <RadioButton
                  type="radio"
                  id="popular"
                  name="sort"
                  onClick={() => onClickRadio("인기순")}
                ></RadioButton>
                <RadioLabel htmlFor="popular" bold={sort === "인기순"}>
                  인기순
                </RadioLabel>
              </RadioBox>
              <RadioBox>
                <RadioButton
                  type="radio"
                  id="review"
                  name="sort"
                  onClick={() => onClickRadio("리뷰만")}
                ></RadioButton>
                <RadioLabel htmlFor="review" bold={sort === "리뷰만"}>
                  리뷰만보기
                </RadioLabel>
              </RadioBox>
              <RadioBox>
                <RadioButton
                  type="radio"
                  id="whole"
                  name="sort"
                  onClick={() => onClickRadio("리뷰인기순")}
                ></RadioButton>
                <RadioLabel htmlFor="whole" bold={sort === "리뷰인기순"}>
                  리뷰인기글
                </RadioLabel>
              </RadioBox>
            </SheetContents>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
      <StyledButton
        border="0px"
        color="white"
        backcolor={primary}
        margin="0"
        width="25%"
        height="auto"
        padding="3% 3% 3% 3%"
        fontSize="16px"
        onClick={() => onClickRegisterBtn()}
      >
        + 글쓰기
      </StyledButton>
    </div>
  );
}
