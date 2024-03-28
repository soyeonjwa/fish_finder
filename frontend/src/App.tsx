import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";

import Footer from "./components/common/Footer";
import Main from "./pages/main/Main";
import Board from "./pages/board/Board";
import Search from "./pages/search/Search";
import BoardDetail from "./pages/board/detail/BoardDetail";
import BoardRegister from "./pages/board/register/BoardRegister";
import MyPage from "./pages/myPage/MyPage";
import Info from "./pages/info/Info";
import Scan from "./pages/scan/Scan";
import MarketCondition from "./pages/marketCondition/MarketCondition";
import Login from "./pages/login/Login";
// import Nickname from "./pages/signup/Nickname";

const Wrapper = styled.div`
  font-family: Pretendard;
  background-color: "#FFFFFF";
  margin: 0;
`;

function App() {
  useEffect(()=>{
    if(!localStorage.getItem('RecentSearch')){
      localStorage.setItem('RecentSearch', JSON.stringify([]));
    }
  },[])

  return (
    <Wrapper>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Footer />}>
            <Route path="" element={<Main />} />
            <Route path="board" element={<Board />} />
            <Route path="search" element={<Search />} />
            <Route path="mypage" element={<MyPage />} />
            <Route path="login" element = {<Login/>}/>
          </Route>
          <Route path="board">
            <Route path=":boardId" element={<BoardDetail />} />
            <Route path="register" element={<BoardRegister />} />
          </Route>
          <Route path="info">
            <Route path=":fishId" element={<Info />} />
          </Route>
          <Route path = "marketCondition">
              <Route path = ":fishId" element  = {<MarketCondition/>}/>
          </Route>
          <Route path="scan" element={<Scan />} />
        </Routes>
      </BrowserRouter>
    </Wrapper>
  );
}

export default App;
