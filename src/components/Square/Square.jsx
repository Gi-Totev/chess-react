import React from "react";

const Square = ({ children, color }) => {
  return (
    <div
      style={{
        backgroundColor: color === "black" ? "#6F4E37" : "#D2B48C",
        width: "100%",
        height: "100%",
      }}
    >
      {children}
    </div>
  );
};

export default Square;
