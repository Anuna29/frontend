import React from 'react'
import "./Button.css"

export const Button = (props) => {
  // <--- Spread operator --->
  const { children, ...rest } = props;

  return (
    <button className="btn" {...rest}>
      {children}
    </button>
  );
};
