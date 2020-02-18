/**
 * https://www.freecodecamp.org/news/create-a-react-frontend-a-node-express-backend-and-connect-them-together-c5798926047c/
 * https://reactjs.org/docs/hooks-effect.html
 * https://stackoverflow.com/questions/53715465/can-i-set-state-inside-a-useeffect-hook
 * https://css-tricks.com/run-useeffect-only-once/
 */
import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.scss';

import CommitList from "./components/CommitList";

function App(props) {

  function callAPI() {
    fetch("http://localhost:3000/api")
      .then(res => res.text())
      .then(res => {
        console.log(res);
        setAPIResponse(JSON.parse(res));
      });
  }

  const [apiResponse, setAPIResponse] = useState([]);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect((e) => {
    callAPI();
  }, [props]); // ,[] only runs once

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" onClick={(e) => {setAPIResponse('test')}} />
        <CommitList commits={apiResponse} />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
