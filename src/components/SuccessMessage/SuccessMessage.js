import React from "react";
import "./success.css";

const SuccessMessage = ({ children }) => {
  return (
    <div className="success-container">
      <h1>{children}</h1>
    </div>
  );
};

export default SuccessMessage;
