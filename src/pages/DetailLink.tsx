import React from 'react';
import { Link } from 'react-router-dom';
import type { DetailLinkProps } from '../utility/Types'

const DetailLink = ({type, id, children, className, ...props}: DetailLinkProps) => {
  const resultsPath = `/details/${type}/${id}`;
  
  return <Link to={resultsPath} {...props}>{children}</Link>
}

export default DetailLink;
