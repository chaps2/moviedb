import React from 'react';

type CardProps = {
  media: React.ReactNode;
  content: React.ReactNode;
  background?: boolean;
}

const Card = ({media, content, background = true}: CardProps) => {
  const containerClasses = "flex flex-col md:flex-row md:space-x-4" + (background ? " bg-gray-200 p-4" : "");
  return (
    <div className={containerClasses}>
      <div className="flex-none md:max-w-xs">
        {media}
      </div>
      <div className="flex-grow">
        {content}
      </div>
    </div>
  );
}

export default Card;