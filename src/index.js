import React from 'react';
import ReactDOM from 'react-dom/client';
import { compose } from 'redux';
import './index.css';
import './fonts/font.css';
import App from './components/app/app';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers();

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
