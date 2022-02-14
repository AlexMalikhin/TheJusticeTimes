import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import App from './App';
import {AppContextProvider} from "./components/AppContext/AppContext";
import './index.css';

ReactDOM.render(
    <BrowserRouter>
      <AppContextProvider>
          <App/>
      </AppContextProvider>
    </BrowserRouter>,
  document.getElementById('root')
);

