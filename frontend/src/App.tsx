import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import Footer from './components/common/Footer';
import Main from './pages/main/Main';
import Board from './pages/board/Board';
import Search from './pages/search/Search';
import BoardDetail from './pages/board/detail/BoardDetail';
import BoardRegister from './pages/board/register/BoardRegister';


const Wrapper = styled.div`
  font-family : Pretendard;
  background-color : '#FFFFFF';
  margin : 0;
`

function App() {

  return (
    <Wrapper>
      <BrowserRouter>
            <Routes>
              <Route path="" element={<Footer/>}>
                <Route path="" element = {<Main/>}/>
                <Route path="board" element={<Board/>}/>
                <Route path="search" element={<Search/>}/>
              </Route>
              <Route path = "board">
                <Route path=":boardId" element={<BoardDetail/>}/>
                <Route path="register" element={<BoardRegister/>}/>
              </Route>
            </Routes>
      </BrowserRouter>
    </Wrapper>
  );
}

export default App;
