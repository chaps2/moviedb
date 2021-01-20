import React from 'react';

type PropertiesProps = {
  propertyPairs: {
    name: any;
    value: any;
  }[];
  id: string;
  policy?: "hide" | "placeholder";
  placeholder?: string;
}

const Properties = ({propertyPairs, id, policy = "placeholder", placeholder = "n/a"}: PropertiesProps) => {

  const Property = ({name, value}) => (
    <>
      <dt>{name}</dt>
        <dd>{value}</dd>
    </>
  );

  return (
    <dl key={id}>
      {propertyPairs.map((property) => {
        return (
          (property.value || policy === "placeholder") &&
            <Property key={id + property.name} name={property.name} value={property.value || placeholder}/>
        )
      })}        
    </dl>
  );
}

export default Properties;
