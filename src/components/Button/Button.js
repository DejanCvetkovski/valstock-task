import React from "react";
import "./button.css";

const Button = ({ type, black, onClick, disabled, children }) => {
  const btnColor = black ? "black" : "white";

  return (
    <button
      type={type ? type : "button"}
      className={`btn ${btnColor}`}
      onClick={onClick}
      disabled={disabled ? true : false}
    >
      {children}
    </button>
  );
};

export default Button;
