import React from 'react';

type ResultsFilterProps = {
  handleFilterSelection: (type: string) => void;
  filterSelection: string;
}

const ResultsFilter = ({ handleFilterSelection, filterSelection}: ResultsFilterProps) => {

  const onClick = (e: React.MouseEvent<HTMLButtonElement>, media_type: string) => {
    // Only call when changed.
    if (media_type !== filterSelection) {
      handleFilterSelection(media_type);
    }
  }

  return (
    <div className="flex space-x-2">
      <button type="button" onClick={(e) => onClick(e, "multi")} className={'focus:outline-none ' + (filterSelection === 'multi' ? 'underline' : '')}>All</button>
      <button type="button" onClick={(e) => onClick(e, "movie")} className={'focus:outline-none ' + (filterSelection === 'movie' ? 'underline' : '')}>Movies</button>
      <button type="button" onClick={(e) => onClick(e, "tv")} className={'focus:outline-none ' + (filterSelection === 'tv' ? 'underline' : '')}>TV Shows</button>
      <button type="button" onClick={(e) => onClick(e, "person")} className={'focus:outline-none ' + (filterSelection === 'person' ? 'underline' : '')}>People</button>
    </div>
  );
}

export default ResultsFilter;