import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './style/css/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from "axios";
import https, { Agent } from "https";

const agent = new Agent({
  rejectUnauthorized: false
});

console.log("agent >> ", agent);

// For GET requests
axios.interceptors.request.use(
   (req) => {
      // configurations used for all requests
      // default httpsAgent for all requests
      req.httpsAgent = agent;
      return req;
   },
   (err) => {
      return Promise.reject(err);
   }
);


/*
const env = process.env.NODE_ENV
if (env === 'local') {
    console.log = function () {};
}
*/
var debug = true;
if(!debug){

  console.log = function () {};
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
