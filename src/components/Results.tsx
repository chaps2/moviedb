import React, { FC } from 'react';

type ResultsProps = {
    results?: Array<any>
    type: string;
    DetailLink: any;
}

const Results: FC<ResultsProps> = ({results, DetailLink, type}:ResultsProps) => {
  const renderDetail = (item) => {

  const media_type = item.media_type ?? type;
    switch (media_type) {
      case 'person':
        return item.known_for_department + ' - ' + item.known_for.slice(0, 3).map(item => item.title ?? item.name).join(', ');
      default:
        return item.overview;
    }
  }

  return (
    <div className="w-full">
      {results?.map((item) => 
        <div className="py-2">
          <div>
            <h3 className="font-bold text-2xl inline"><DetailLink type={item.media_type ?? type} id={item.id}>{item.title ?? item.name}</DetailLink></h3>
             {item.media_type && <span> ({item.media_type})</span>}
          </div>
          <p className="line-clamp-2">{renderDetail(item)}</p>
        </div>
      )}
    </div>
  );
}

export default Results;
