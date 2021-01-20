import React, {useEffect, useState} from 'react';
import ShowCredits from './ShowCredits';
import { Card, Properties } from '../styledcomponents';

type ShowProps = {
  id: number;
  DetailLink: any;
}

type ShowDO = {
  name: string;
  overview: string;
  poster_path: string;
  number_of_seasons: number;
  number_of_episodes: number;
  credits: {
    cast: []
    crew: []
  };
}

const Show = ({id, DetailLink}: ShowProps) => {
  const [details, setDetails] = useState<ShowDO | undefined>(undefined);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/tv/${id}?append_to_response=credits&api_key=d6e80f5f86d7dd6c67ac00783d50af52`, {mode: 'cors'})
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
  
  if (details) {
    const cast = <ShowCredits credits={details?.credits?.cast} type="person" titleIdentifier="name" roleIdentifier="character" DetailLink={DetailLink} placeHolder='No cast details available.'/>;
    const crew = <ShowCredits credits={details?.credits?.crew} type="person" titleIdentifier="name" roleIdentifier="job" DetailLink={DetailLink} placeHolder='No crew details available.'/>;
    
    const media = <img width="100%" src={`http://image.tmdb.org/t/p/w780/${details.poster_path}`} alt={`Poster for ${details.name}`}/>

    const mainProperties = [
      {name: "Overview", value: details?.overview},
      {name: "Number of seasons", value: details?.number_of_seasons},
      {name: "Number of episodes", value: details?.number_of_episodes}
    ];

    const castProperties = [
      {name: "Cast", value: cast},
      {name: "Crew", value: crew}
    ];

    return (
      <div>
        <h1 className="mb-4">{details?.name}</h1>
        <Card media={media} content={
          <Properties propertyPairs={mainProperties}/>
        }/>
        <section className="mt-4">
          <Properties propertyPairs={castProperties}/>
        </section>
      </div>  
    )
  }
  else {
    return <p>Loading...</p> 
  };
}

export default Show;
