import React from "react";
import { useParams } from "react-router-dom";
import Show from "../components/Show"; 
import Movie from "../components/Movie"; 
import Person from "../components/Person"; 

import DetailLink from './DetailLink';

const DetailsPage = () => {
    const params: any = useParams();

    return (
      <article className="detail-properties">
        {(() => {
          switch (params.type) {
            case 'movie':
              return <Movie id={params.id} DetailLink={DetailLink}/>;
            case 'tv':
              return <Show id={params.id} DetailLink={DetailLink}/>;
            case 'person':
              return <Person id={params.id} DetailLink={DetailLink}/>;
            default:
              return null;              
          }
        })()}
      </article>
    );
};

export default DetailsPage;