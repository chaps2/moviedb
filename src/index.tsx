import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter as Router } from "react-router-dom";

import './tailwind.css';

type AppWindow = typeof window & {__TMDB_API_KEY__: string};

const appWindow = window as AppWindow;

ReactDOM.render(
  
  <React.StrictMode>
    <Router>
      <App tmdbApiKey={appWindow.__TMDB_API_KEY__ ?? import.meta.env.SNOWPACK_PUBLIC_TMDB_API_KEY}/>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
