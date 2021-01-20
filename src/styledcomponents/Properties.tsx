import React from 'react';

type PropertiesProps = {
  propertyPairs: {
    name: any;
    value: any;
  }[];
  policy?: "hide" | "placeholder";
  placeholder?: string;
}

const Properties = ({propertyPairs, policy = "hide", placeholder = "n/a"}: PropertiesProps) => {

  const Property = ({name, value}) => (
    <>
      <dt>{name}</dt>
        <dd>{value}</dd>
    </>
  );

  return (
    <dl>
      {propertyPairs.map((property) => {
        return (
          (property.value || policy !== "hide") ?
            <Property name={property.name} value={property.value}/>
          :
            <Property name={property.name} value={placeholder}/>
          )
        }
      )}        
    </dl>
  );
}

export default Properties;
