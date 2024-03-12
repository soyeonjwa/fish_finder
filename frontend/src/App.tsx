import React from 'react';
import './App.css';
import Footer from './components/common/Footer';
import { Button } from './components/common/Button';


function App() {

  return (
    <div className="App">
      <Button
        width='20%'
        height = 'auto'
        margin = '5%'
      >
      돌돔
      </Button>
      <Footer></Footer>
    </div>
  );
}

export default App;
