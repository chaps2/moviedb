import React from 'react';
import PageTemplate from './pages/PageTemplate';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';
import DetailsPage from './pages/DetailsPage';
import RouterSearch from './pages/RouterSearch';
import { HashRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  
  // Return the App component.
  return (
    <Router>
      <Switch>
        <Route exact={true} path="/">
          <PageTemplate>
            <HomePage/>
          </PageTemplate>
        </Route>
        <Route exact={false} path="/results">
          <PageTemplate search={<RouterSearch/>}>
            <ResultsPage/>
          </PageTemplate>
        </Route>
        <Route path="/details/:type/:id">
          <PageTemplate search={<RouterSearch/>}>
            <DetailsPage/>
          </PageTemplate>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
