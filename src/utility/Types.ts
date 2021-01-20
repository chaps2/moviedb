import type {FC} from 'react';

type ResourceId = {
    type: "movie" | "tv" | "person";
    id: number;
}

type DetailLinkProps = React.PropsWithChildren<FC> & ResourceId & any; 

type DetailLinkType = FC<DetailLinkProps>

export { ResourceId, DetailLinkType, DetailLinkProps }