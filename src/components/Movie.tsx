import React, {useEffect, useState} from 'react';
import ShowCredits from './ShowCredits';
import { Card, Properties } from '../styledcomponents';
import { TMDBMovieDS3, MovieDO } from '../utility/DataSource';

type MovieProps = {
  id: number;
  DetailLink: any;
}

const Movie = ({id, DetailLink}: MovieProps) => {
  const [details, setDetails] = useState<MovieDO | undefined>(undefined);

  const tmdb = new TMDBMovieDS3();

  useEffect(() => {
    tmdb.getMovie((id)).then(
        result => setDetails(result),
        error => console.log(error)
      );
  }, []);

  if (details) {
    const cast = <ShowCredits credits={details?.credits?.cast} type="person" titleIdentifier="name" roleIdentifier="character" DetailLink={DetailLink} placeHolder='No cast details available.'/>;
    const crew = <ShowCredits credits={details?.credits?.crew} type="person" titleIdentifier="name" roleIdentifier="job" DetailLink={DetailLink} placeHolder='No crew details available.'/>;

    const media = <img width="100%" src={`http://image.tmdb.org/t/p/w780/${details.poster_path}`} alt={`Poster for ${details.title}`}/>

    const mainProperties = [
      {name: "Overview", value: details?.overview},
      {name: "Runtime", value: (details?.runtime ? details?.runtime + ' mins' : null)}
    ];

    const castProperties = [
      {name: "Cast", value: cast},
      {name: "Crew", value: crew}
    ];

    return (
      <>
        <h1 className="mb-4">{details?.title}</h1>
        <Card media={media} content={
          <Properties propertyPairs={mainProperties}/>
        }/>
        <section className="mt-4">
          <Properties propertyPairs={castProperties}/>
        </section>
      </>  
    )
  }
  else {
    return <p>Loading...</p>;
  }
}

export default Movie;
