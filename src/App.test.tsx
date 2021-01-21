import * as React from 'react';
import { render } from '@testing-library/react';
import { expect } from 'chai';
import App from './App';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history'

describe('<App/>', () => {
  it('routes to the home page at /', () => {
    const history = createMemoryHistory();
 
    history.push('/');

    const homePage = render(
      <Router history={history}>
        <App tmdbApiKey={import.meta.env.SNOWPACK_PUBLIC_TMDB_API_KEY} />
      </Router>
    );

    expect(document.body.contains(homePage.getByText(/The Movie DB/i)));
  });

  it('routes to the results page at /results', () => {
    const history = createMemoryHistory();

    history.push('/results');

    const resultsPage = render(
      <Router history={history}>
        <App tmdbApiKey={import.meta.env.SNOWPACK_PUBLIC_TMDB_API_KEY} />
      </Router>
    );

    expect(document.body.contains(resultsPage.getByText(/Searching.../i)));
  });
});
