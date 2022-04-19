import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import {Header} from './layout'
import {Jumbotron} from './components'
import {QuizPage, Settings} from './pages'
import { Button } from 'react-bootstrap';



function App() {

  return (
    <div className="App">
      <Header/>
      <main>
        <Routes>
          <Route path="/" element={<Jumbotron/>}/>
          <Route path="/settings" element={<Settings/>}/>
          <Route path="/quiz" element={<QuizPage/>}/>
        </Routes>

      </main>
    </div>
  );
}

export default App;
