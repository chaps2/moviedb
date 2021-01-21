import React, { createContext } from 'react';
import PageTemplate from './pages/PageTemplate';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';
import DetailsPage from './pages/DetailsPage';
import RouterSearch from './pages/RouterSearch';
import { Switch, Route } from "react-router-dom";
import type { IMovieDS } from "./utility/DataSource";
import { TMDBMovieDS3 } from "./utility/DataSource";

type AppProps = {
  tmdbApiKey: string;
};

export const DataServiceContext: React.Context<IMovieDS> = createContext({} as IMovieDS);

const App = ({tmdbApiKey}: AppProps) => {
  const dataService: IMovieDS = new TMDBMovieDS3(tmdbApiKey) as IMovieDS;
  
  // Return the App components.
  return (
    <DataServiceContext.Provider value={dataService}>
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
    </DataServiceContext.Provider>
  );
}

export default App;
