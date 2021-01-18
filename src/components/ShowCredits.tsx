import React from 'react';

type ShowCreditsProps = {
  type: string;
  titleIdentifier: string;
  roleIdentifier: string;
  credits: []
  DetailLink: any;
}

type PersonCredit = {
  id: number;
  name: string;
  credits: any[]
}

const ShowCredits = ({DetailLink, ...props}: ShowCreditsProps) => {
  const persons: PersonCredit[] = [];

  // Gather credits by id.
  props?.credits?.forEach((credit: any) => {
    if (!persons[credit.id]) {
      persons[credit.id] = {
        id: credit.id,
        name: credit[props.titleIdentifier],
        credits: [credit]
      };
    }
    else {
      persons[credit.id].credits.push(credit);
    }
  });

  return (
    <ul>
      {persons.map((item: any) => {
        const creditString = item.credits.map((credit: any) => credit[props.roleIdentifier]).join(", ");
        return (
          <li key={item.id} className="flex flex-nowrap border-red-500 border-bottom">
            <div className="flex-shrink">
              <DetailLink className="underline hover:text-blue-900" type={props.type} id={item.id}>{item.title ?? item.name}</DetailLink>
            </div>
            <div className="credit-role flex-grow text-right">
              {creditString ? creditString : ''}
            </div>
          </li>);          
      })}
    </ul>
  );
}

export default ShowCredits;