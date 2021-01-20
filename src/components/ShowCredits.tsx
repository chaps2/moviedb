import React from 'react';
import groupBy from 'lodash/groupBy';

type ShowCreditsProps = {
  type: string;
  titleIdentifier: string;
  roleIdentifier: string;
  credits: [] | undefined;
  DetailLink: any;
  placeHolder: string;
}

const ShowCredits = ({credits, DetailLink, ...props}: ShowCreditsProps) => {

  if (credits && credits.length > 0) {
    // Gather credits by id.
    const persons = groupBy(credits, (credit: any) => credit.id);

    return (
      <ul>
        {Object.keys(persons).map((id) => {
          const credits = persons[id];
          const creditString = credits.map((credit: any) => credit[props.roleIdentifier]).join(", ");
          const name = credits[0][props.titleIdentifier];
          return (
            <li key={id} className="flex flex-nowrap border-b border-gray-300 my-2">
              <div className="flex-shrink">
                <DetailLink className="underline hover:text-blue-900" type={props.type} id={id}>{name}</DetailLink>
              </div>
              <div className="credit-role flex-grow text-right">
                {creditString ? creditString : ''}
              </div>
            </li>);          
        })}
      </ul>
    );
  }
  else {
    return <>{props.placeHolder}</>;
  }
}

export default ShowCredits;