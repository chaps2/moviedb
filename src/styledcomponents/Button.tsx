import React from 'react';

type ButtonProps = Omit<JSX.IntrinsicElements["button"], "type" | "className" | "role">
  & {
    type?: "link" | "primary";
    selected?: boolean;
  };

const Button = ({selected = false, type = "primary", ...props}: ButtonProps) => {
  let className = '';
  switch (type) {
    case "primary":
      className = "mybtn";
      break;
    case "link":
      className = 'focus:outline-none' + (selected ? ' underline' : '');
      break;
    default:
  }
  return <button {...props} type="button" role="button" className={className}>{props.children}</button>
}

export default Button;