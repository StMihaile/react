import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App.jsx';
import reportWebVitals from './reportWebVitals';

const el  = React.createElement(
  'h1',
  null,
  'Hello world React.js'
)
const el2 = <h2>Hello world!!!!
  <p> hohohoho</p>
  <ul>
    <li>sdf</li>
  <li>sdf</li>
  </ul>
</h2>

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <React.StrictMode>
 <App />
</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
