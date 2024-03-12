import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import Footer from './components/common/Footer';
import Main from './pages/main/Main';
import Board from './pages/board/Board';
import Search from './pages/search/Search';


const Wrapper = styled.div`
  background-color : '#FFFFFF';
  margin : 0;
`

function App() {

  return (
    <Wrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="" element={<Main/>}/>
            <Route path="/board" element={<Board/>}/>
            <Route path="/search" element={<Search/>}/>
          </Route>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </Wrapper>
  );
}

export default App;
