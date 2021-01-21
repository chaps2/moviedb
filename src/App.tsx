import React, { createContext } from 'react';
import PageTemplate from './pages/PageTemplate';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';
import DetailsPage from './pages/DetailsPage';
import RouterSearch from './pages/RouterSearch';
import { Switch, Route } from "react-router-dom";
import type { IMovieDS } from "./utility/DataSource";
import { TMDBMovieDS3 } from "./utility/DataSource";

export const DataServiceContext: React.Context<IMovieDS> = createContext(new TMDBMovieDS3("d6e80f5f86d7dd6c67ac00783d50af52") as IMovieDS);

const App = () => {
  
  // Return the App component.
  return (
    <Switch>
      <Route exact={true} path="/">
        <PageTemplate variant="centered">
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
  );
}

export default App;
