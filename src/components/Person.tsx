import React, {useEffect, useState} from 'react';
import ShowCredits from './ShowCredits';

type PersonProps = {
  id: number;
  DetailLink: any;
}

type PersonDO = {
  name: string;
  biography: string;
  place_of_birth: string;
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
  
  const cast = details?.movie_credits?.cast?.length ? 
    <ShowCredits credits={details.movie_credits.cast} type="movie" titleIdentifier="title" roleIdentifier="character" DetailLink={DetailLink}/>
    :
    'Zero cast credits.'
  ;

  const crew = details?.movie_credits?.crew?.length ? 
    <div><ShowCredits credits={details.movie_credits.crew} type="movie" titleIdentifier="title" roleIdentifier="job" DetailLink={DetailLink}/></div>
    :
    'Zero crew credits.'
  ;

  const tvcast = details?.tv_credits?.cast?.length ? 
    <ShowCredits credits={details.tv_credits.cast} type="tv" titleIdentifier="name" roleIdentifier="character" DetailLink={DetailLink}/>
    :
    'Zero cast credits.'
  ;

  const tvcrew = details?.tv_credits?.crew?.length ? 
    <div><ShowCredits credits={details.tv_credits.crew} type="tv" titleIdentifier="name" roleIdentifier="job" DetailLink={DetailLink}/></div>
    :
    'Zero crew credits.'
  ;

  return (
    details ?
    <div>
    <h1>{details?.name}</h1>
    <dl>
      <dt className="sticky">Biography</dt>
        <dd>{details?.biography}</dd>
      <dt>Place of birth</dt>
        <dd>{details?.place_of_birth}</dd>
      <dt>Movie credits</dt>     
        <dd>
          <dl>
            <dt>Cast credits</dt>     
              <dd>{cast}</dd>
            <dt>Crew credits</dt>     
              <dd>{crew}</dd>
          </dl>
        </dd>
      <dt>TV credits</dt>     
        <dd>
          <dl>
            <dt>Cast credits</dt>     
              <dd>{tvcast}</dd>
            <dt>Crew credits</dt>     
              <dd>{tvcrew}</dd>
          </dl>
        </dd>
    </dl>

    </div>
    :
    <p>Loading...</p>
  );
}

export default Person;
