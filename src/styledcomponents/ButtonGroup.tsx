import React from 'react';

type ButtonGroupProps = {
  children: React.ReactNode[]
}

const ButtonGroup = ({children, ...props }: ButtonGroupProps) => {

  return (
    <div className="flex space-x-2" {...props}>
      {children}
    </div>
  )

}

export default ButtonGroup;