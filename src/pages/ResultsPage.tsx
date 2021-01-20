import React, { useState, useEffect } from 'react';

import Results from '../components/Results';
import ResultsFilter from '../components/ResultsFilter';

import { useLocation, useHistory } from 'react-router-dom';
import DetailLink from './DetailLink';

import { TMDBMovieDS3 } from '../utility/DataSource';

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

  const tmdb = new TMDBMovieDS3();
  
  useEffect(() => {
    setResultsStatus("Searching...");
    tmdb.search(searchTerm, searchType).then(
      result => {
        if (result.results) {
          setResults(result.results);
          setResultsStatus(result.results.length > 0 ? "OK" : "No results found.");
        }
        else {
          setResults([]);
          setResultsStatus(searchTerm === "" ? "Please enter a search term." : "There was a problem. Please try again.");
        }
      },
      error => {
        setResultsStatus("There was a problem. Please try again.");
        console.log(error);
      }
   );
  }, [searchTerm, searchType]);

  const location = useLocation();
 
  return (
    <div key="{location.key}">
      <div className="w-full">
        <div className="flex py-2">
          <h2 className="flex-grow">Search results for: "{searchTerm}"</h2>
          <ResultsFilter handleFilterSelection={handleFilterSelection} filterSelection={searchType}/>
        </div>
        {resultsStatus === "OK" ?
        <Results DetailLink={DetailLink} results={results} type={searchType}/>
        :
        <p>{resultsStatus}</p>}
        </div>
    </div>
  );
}

export default ResultsPage;