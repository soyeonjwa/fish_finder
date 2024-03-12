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
const ContentWrapper = styled.div`
  padding-bottom : 72px;

  @media only screen and (max-width: 300px) {
    padding-bottom : 60px;
  }

  @media only screen and (min-width: 400px) {
    padding-bottom : 80px;
  }

  @media only screen and (min-width: 450px) {
    padding-bottom : 90px;
  }

  @media only screen and (min-width: 500px) {
    padding-bottom : 100px;
  }
`

function App() {

  return (
    <Wrapper>
      <BrowserRouter>
          <ContentWrapper>
          <Routes>
            <Route path="/">
              <Route path="" element={<Main/>}/>
              <Route path="/board" element={<Board/>}/>
              <Route path="/search" element={<Search/>}/>
            </Route>
          </Routes>
          </ContentWrapper>
          <Footer></Footer>
      </BrowserRouter>
    </Wrapper>
  );
}

export default App;
