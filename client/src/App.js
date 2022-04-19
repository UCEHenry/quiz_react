import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, } from './actions';

import {Header} from './layout'
import {Jumbotron} from './components'
import {QuizPage} from './pages'
import { Button } from 'react-bootstrap';


function App() {
  const counter = useSelector(state => state.counter)
  const dispatch = useDispatch()
  return (
    <div className="App">
      <Header/>
      <h1>Counter {counter} </h1>
      <Button onClick={() => dispatch(increment())}>+</Button>
      <Button onClick={() => dispatch(decrement())}>-</Button>
      <main>
        <Routes>
          <Route path="/" element={<Jumbotron/>}/>
          <Route path="/quiz" element={<QuizPage/>}/>
        </Routes>

      </main>
    </div>
  );
}

export default App;
