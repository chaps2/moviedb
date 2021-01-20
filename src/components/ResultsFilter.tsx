import React from 'react';
import { Button, ButtonGroup } from '../styledcomponents';

type ResultsFilterProps = {
  handleFilterSelection: (type: string) => void;
  filterSelection: string;
}

const ResultsFilter = ({ handleFilterSelection, filterSelection}: ResultsFilterProps) => {

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, media_type: string) => {
    // Only call when changed.
    if (media_type !== filterSelection) {
      handleFilterSelection(media_type);
    }
  }

  return (
    <ButtonGroup>
      <Button type="link" onClick={(e) => handleClick(e, "multi")} selected={filterSelection === 'multi'}>All</Button>
      <Button type="link" onClick={(e) => handleClick(e, "movie")} selected={filterSelection === 'movie'}>Movies</Button>
      <Button type="link" onClick={(e) => handleClick(e, "tv")} selected={filterSelection === 'tv'}>TV Shows</Button>
      <Button type="link" onClick={(e) => handleClick(e, "person")} selected={filterSelection === 'person'}>People</Button>
    </ButtonGroup>
  );
}

export default ResultsFilter;