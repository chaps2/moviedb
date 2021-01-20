import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import SearchSuggest from '../components/SearchSuggest';
import DetailLink from './DetailLink';

const RouterSearch = () => {
  const history = useHistory();

  const handleSearchSubmit = (searchTerm: string, searchType: string) => {
    const path = '/results';
    const search = `?query=${searchTerm}&type=${searchType}`;
    if (history.location.pathname === path && history.location.search === search) {
      history.replace(path + search);
    }
    else {
      history.push(path + search);
    }
  }

  return <SearchSuggest DetailLink={DetailLink} handleSearchSubmit={handleSearchSubmit}/>;
}

export default RouterSearch;