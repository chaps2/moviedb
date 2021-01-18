import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { expect } from 'chai';

import ResultsFilter from './ResultsFilter';

it('test default filter', () => {
  let handledType: string = "";
  const handleFilterSelection = (type: string) => {handledType = type};
  render(<ResultsFilter handleFilterSelection={handleFilterSelection.bind(this)} filterSelection="movie"/>)

  const allButton = screen.getByText('All');
  const movieButton = screen.getByText('Movies');
  const tvButton = screen.getByText('TV Shows');
  const peopleButton = screen.getByText('People');

  fireEvent.click(allButton);
  expect(handledType === 'multi', 'All type return is multi');
  expect(allButton.hasAttribute("selected"), 'All button is selected');

  fireEvent.click(movieButton);
  expect(handledType === 'movie', 'Movies type return is movie');
  expect(movieButton.hasAttribute("selected"), 'Movie button is selected');


  fireEvent.click(tvButton);
  expect(handledType === 'tv', 'TV Shows type return is tv');
  expect(tvButton.hasAttribute("selected"), 'TV Shows button is selected');

  fireEvent.click(peopleButton);
  expect(handledType === 'people', 'People type return is people');
  expect(peopleButton.hasAttribute("selected"), 'People button is selected');
});