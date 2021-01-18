import * as React from 'react';
import { render } from '@testing-library/react';
import { expect } from 'chai';
import App from './App';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history'

describe('<App/>', () => {
  it('home page navigation', () => {
    const history = createMemoryHistory();
 
    history.push('/');

    const homePage = render(
      <Router history={history}>
        <App />
      </Router>
    );

    expect(document.body.contains(homePage.getByText(/The Movie DB/i)));
  });

  it('results page navigation', () => {
    const history = createMemoryHistory();

    history.push('/results');

    const resultsPage = render(
      <Router history={history}>
        <App />
      </Router>
    );

    expect(document.body.contains(resultsPage.getByText(/Searching.../i)));
  });
});
