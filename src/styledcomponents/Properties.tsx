import React from 'react';

type PropertiesProps = {
  propertyPairs: {
    name: any;
    value: any;
  }[];
  policy?: "hide" | "placeholder";
  placeholder?: string;
}

const Properties = ({propertyPairs, policy = "placeholder", placeholder = "n/a"}: PropertiesProps) => {

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
          (property.value || policy === "placeholder") &&
            <Property name={property.name} value={property.value || placeholder}/>
        )
      })}        
    </dl>
  );
}

export default Properties;
