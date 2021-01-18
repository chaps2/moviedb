import React from 'react';
import { Link } from 'react-router-dom';

type DetailLinkProps = {
  type: string;
  id: string;
  children: React.ReactElement;
}

const DetailLink = ({type, id, children, ...props}: DetailLinkProps) => {
  const resultsPath = `/details/${type}/${id}`;
  
  return <Link to={resultsPath} {...props}>{children}</Link>
}

export default DetailLink;
