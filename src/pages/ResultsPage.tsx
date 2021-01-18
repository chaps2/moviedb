import React, { useState, useEffect } from 'react';

import Results from '../components/Results';
import ResultsFilter from '../components/ResultsFilter';

import { useLocation, useHistory } from 'react-router-dom';
import DetailLink from './DetailLink';

const useQuery = () => new URLSearchParams(useLocation().search);

const ResultsPage = () => {
  const query = useQuery();

  // Get search state from query parameters.
  const searchTerm = query.get("query") ?? "";
  const searchType = query.get("type") ?? "multi";

  const [ results, setResults ] = useState<any>(null);
  const [ resultsStatus, setResultsStatus ] = useState<string>("");

  const history = useHistory();
  const handleFilterSelection = (type: string) => history.push(`/results?query=${searchTerm}&type=${type}`);

  useEffect(() => {
    setResultsStatus("Searching...");
    fetch(`https://api.themoviedb.org/3/search/${searchType}?query=${searchTerm}&api_key=d6e80f5f86d7dd6c67ac00783d50af52`, {mode: 'cors'})
      .then(res => res.json())
      .then(
        (result) => {
          if (result.results) {
            setResults(result.results);
            setResultsStatus(result.results.length > 0 ? "OK" : "No results found.");
          }
          else {
            setResults([]);
            setResultsStatus("There was a problem. Please try again.");
          }
        },
        (error) => {
          setResultsStatus("There was a problem. Please try again.");
          console.log(error);
        }
      );
  }, [searchTerm, searchType]);

  const location = useLocation();
 
  return (
    <div key="{location.key}">
    {resultsStatus === "OK" ?
      <div className="w-full">
        <div className="flex">
          <h2 className="flex-grow">Search results for: "{searchTerm}"</h2>
          <ResultsFilter handleFilterSelection={handleFilterSelection} filterSelection={searchType}/>
        </div>
        <Results DetailLink={DetailLink} results={results} type={searchType}/>
      </div>
    :
      <p>{resultsStatus}</p>}
    </div>
  );
}

export default ResultsPage;