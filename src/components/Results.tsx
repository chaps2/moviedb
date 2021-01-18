import React, { FC } from 'react';

type ResultsProps = {
    results?: Array<any>
    type: string;
    DetailLink: any;
}

const Results: FC<ResultsProps> = ({results, DetailLink, type}:ResultsProps) => {
  return (
    <table className="w-full">
        <thead>
            <tr>
            <th>Name</th>
              <th>Detail</th>
              <th>Type</th>
            </tr>
        </thead>
        <tbody>
        {results?.map((item) => 
          <tr key={item.id}>
            <td>
              <DetailLink className="underline" type={item.media_type ?? type} id={item.id}>{item.title ?? item.name}</DetailLink>
            </td>
            <td>{item.overview}</td>
            <td>{item.media_type ?? type}</td>
          </tr>
        )}
        </tbody>
    </table>
  );
}

export default Results;
