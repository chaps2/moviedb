import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { expect } from 'chai';

import SearchSuggest from './SearchSuggest';

it('test search', () => {
  let handledType: string = "";
  let handledTerm: string = "";

  const handleSearchSubmit = (searchTerm: string, searchType: string) => {
    handledType = searchType;
    handledTerm = searchTerm;
  }

  render(<SearchSuggest handleSearchSubmit={handleSearchSubmit}/>);

  const searchButton = screen.getByRole('button', {name: /search/i});
  const searchInput = screen.getByLabelText('Search');

  fireEvent.change(searchInput, { target: { value: "pete" } });
  fireEvent.click(searchButton);

  expect(handledTerm === "pete" && handledType === 'multi', 'Search handler correct.');
});