import React, {useEffect, useState} from 'react';
import ShowCredits from './ShowCredits';

type MovieProps = {
  id: number;
  DetailLink: any;
}

type MovieDO = {
  title: string;
  overview: string;
  runtime: number;
  credits: {
    cast: []
    crew: []
  };
}

const Movie = ({id, DetailLink}: MovieProps) => {
  const [details, setDetails] = useState<MovieDO | undefined>(undefined);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?append_to_response=credits&api_key=d6e80f5f86d7dd6c67ac00783d50af52`, {mode: 'cors'})
      .then(res => res.json())
      .then(
        (result) => {
          setDetails (result);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  const cast = details?.credits?.cast?.length ? 
    <ShowCredits credits={details.credits.cast} type="person" titleIdentifier="name" roleIdentifier="character" DetailLink={DetailLink}/>
    :
    'No cast details available.'
  ;
  
  const crew = details?.credits?.crew?.length ? 
    <ShowCredits credits={details.credits.crew} type="person" titleIdentifier="name" roleIdentifier="job" DetailLink={DetailLink}/>
    :
    'No crew details available.'
  ;
  
  // Return the App component.
  return (
    details ?
    <div>
    <h1>{details?.title}</h1>
    <dl>
      <dt>Overview</dt>
        <dd>{details?.overview ?? "n/a"}</dd>
      <dt>Runtime</dt>
        <dd>{details?.runtime} mins</dd>
      <dt>Cast</dt>
        <dd>{cast}</dd>
      <dt>Crew</dt>
        <dd>{crew}</dd>
    </dl>
    </div>
    :
    <p>Loading...</p>
  );
}

export default Movie;
