import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter as Router } from "react-router-dom";

import './tailwind.css';

ReactDOM.render(

  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
