import React, {useState, useRef, useEffect, FC} from 'react';
import { Button } from '../styledcomponents'
import type { DetailLinkType } from '../utility/Types';

type SearchProps = {
  handleSearchSubmit: (searchTerm: string, searchType: string) => void,
  DetailLink: DetailLinkType;
}

const AutoSearch = ({handleSearchSubmit, DetailLink, ...props}: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const [displaySuggestions, setDisplaySuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const suggestionsWrapperRef = useRef<any>();

  useEffect(() => {
    if (displaySuggestions) {
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [displaySuggestions]);

  const handleClickOutside = (e) => {
    if (!(suggestionsWrapperRef?.current.contains(e.target))) {
      setDisplaySuggestions(false);
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm (e.target.value);

    if (e.target.value.trim().length > 4) {
      fetch(`https://api.themoviedb.org/3/search/multi?query=${e.target.value}&api_key=d6e80f5f86d7dd6c67ac00783d50af52`, {mode: 'cors'})
      .then(res => res.json())
      .then(
        (result) => {
          if (result.results) {
            setSuggestions(result.results);
            setDisplaySuggestions (true);
          }
        },
        (error) => {
          console.log(error);
        }
      );      
    }
    else {
      setDisplaySuggestions (false);
    }
  }

  const handleSearch = () => {
    setDisplaySuggestions (false);
    handleSearchSubmit(searchTerm, "multi");
  } 

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleSearch();
  }

  return (
    <div role="search" className="flex space-x-3">
      <div className="relative" ref={suggestionsWrapperRef}>
      <label>
        <span className="invisible absolute">Search</span>
        <input value={searchTerm} className="w-auto" size={30} placeholder="Movie, TV show, or person" onChange={onChange} onKeyUp={onKeyPress} type="search" autoFocus/>
      </label>  
      {displaySuggestions && 
        <div className="h-64 overflow-auto max-h-screen absolute rounded-lg border-transparent appearance-none border border-gray-300 py-2 bg-white text-gray-700 shadow-sm inset-x-0 mt-1">
          <ul>
            {suggestions.length > 0 && suggestions.map((item: any, i) => 
              <li className="" key={item.id}>
                <DetailLink className="hover:bg-gray-200 block py-1 px-4" onClick={() => setDisplaySuggestions(false)} type={item.media_type} id={item.id}>{item.name ?? item.title}</DetailLink>
              </li>
            )}
            {suggestions.length === 0 &&
              <li className="text-gray-500">
                No options
              </li>
            }
          </ul>
        </div>
      }
      </div>
      <Button type="primary" onClick={onClick}>Search</Button>
    </div>
  );
}

export default AutoSearch;
