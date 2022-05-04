import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { store } from "./store";
import {Provider} from "react-redux";
import {wsInitialization} from "./websockets/initialization";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
      <App />
  </Provider>
);

wsInitialization();


