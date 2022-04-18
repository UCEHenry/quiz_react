import './App.css';
import React from 'react';
import {Header} from './layout'
import {Jumbotron} from './components'
function App() {
  return (
    <div className="App">
      <Header/>
      <main>
        <Jumbotron/>
      </main>
    </div>
  );
}

export default App;
