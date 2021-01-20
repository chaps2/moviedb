import React, {useEffect, useState} from 'react';
import ShowCredits from './ShowCredits';
import { Card, Properties } from '../styledcomponents';

type PersonProps = {
  id: number;
  DetailLink: any;
}

type PersonDO = {
  name: string;
  biography: string;
  place_of_birth: string;
  profile_path: string;
  movie_credits: {
    cast: []
    crew: []
  };
  tv_credits: {
    cast: []
    crew: []
  };
}

const Person = ({id, DetailLink}: PersonProps) => {
  const [details, setDetails] = useState<PersonDO | undefined>(undefined);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/person/${id}?append_to_response=movie_credits,tv_credits&api_key=d6e80f5f86d7dd6c67ac00783d50af52`, {mode: 'cors'})
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
    const cast = <ShowCredits credits={details?.movie_credits?.cast} type="movie" titleIdentifier="title" roleIdentifier="character" DetailLink={DetailLink} placeHolder='Zero cast credits.'/>;
    const crew = <ShowCredits credits={details?.movie_credits?.crew} type="movie" titleIdentifier="title" roleIdentifier="job" DetailLink={DetailLink} placeHolder='Zero crew credits.'/>;

    const tvcast = <ShowCredits credits={details?.tv_credits?.cast} type="tv" titleIdentifier="name" roleIdentifier="character" DetailLink={DetailLink} placeHolder='Zero cast credits.'/>;
    const tvcrew = <ShowCredits credits={details?.tv_credits?.crew} type="tv" titleIdentifier="name" roleIdentifier="job" DetailLink={DetailLink} placeHolder='Zero crew credits.'/>;

    const media = <img width="100%" src={`http://image.tmdb.org/t/p/h632/${details.profile_path}`} alt={`Poster for ${details?.name}`}/>

    const mainProperties = [
      {name: "Biography", value: details?.biography},
      {name: "Place of birth", value: details?.place_of_birth},
    ];

    const movieCreditProperties = [
      {name: "Cast member", value: cast},
      {name: "Crew member", value: crew}
    ];

    const tvCreditProperties = [
      {name: "Cast member", value: tvcast},
      {name: "Crew member", value: tvcrew}
    ];
    
    return (
      <div>
        <h1 className="mb-4">{details?.name}</h1>
        <Card media={media} content={
          <Properties propertyPairs={mainProperties}/>
        }/>
        <section className="mt-4">
          <Properties propertyPairs={[
            {name: "Movie credits", "value": <Properties propertyPairs={movieCreditProperties}/>},
            {name: "TV credits", "value": <Properties propertyPairs={tvCreditProperties}/>}
          ]}/>
        </section>
      </div>  
    )
  }
  else {
    return <p>Loading...</p>;
  }
}

export default Person;
