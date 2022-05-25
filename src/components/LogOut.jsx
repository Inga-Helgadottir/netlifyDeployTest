import React from "react";

const LogOut = ({ onClick }) => {
  return (
    <div>
      <button className="btn" onClick={onClick}>
        Log out
      </button>
    </div>
  );
};

export default LogOut;
