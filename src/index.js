import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import '@atlaskit/css-reset';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import {Provider} from "react-redux";
import Store from './Redux/Store';
import {BrowserRouter as Router }from 'react-router-dom'


ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store}>
      <Router>
      <App />

      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);