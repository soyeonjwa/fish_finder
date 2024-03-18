import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import Footer from './components/common/Footer';
import Main from './pages/main/Main';
import Board from './pages/board/Board';
import Search from './pages/search/Search';
import BoardDetail from './pages/board/detail/BoardDetail';


const Wrapper = styled.div`
  font-family : Pretendard;
  background-color : '#FFFFFF';
  margin : 0;
`
const ContentWrapper = styled.div`
  padding-bottom : 72px;

  @media only screen and (max-width: 300px) {
    padding-bottom : 60px;
  }

  @media only screen and (max-width: 400px) {
    padding-bottom : 80px;
  }

  @media only screen and (max-width: 450px) {
    padding-bottom : 90px;
  }

  @media only screen and (max-width: 500px) {
    padding-bottom : 100px;
  }
`

function App() {

  return (
    <Wrapper>
      <BrowserRouter>
          <ContentWrapper>
            <Routes>
              <Route path="" element={<Footer/>}>
                <Route path="" element = {<Main/>}/>
                <Route path="board" element={<Board/>}/>
                <Route path="search" element={<Search/>}/>
              </Route>
              <Route path = "board">
                <Route path=":boardId" element={<BoardDetail/>}/>
              </Route>
            </Routes>
          </ContentWrapper>
      </BrowserRouter>
    </Wrapper>
  );
}

export default App;
