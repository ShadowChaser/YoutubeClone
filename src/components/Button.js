import React from "react";

const Button = ({ name, key1 }) => {
  return (
    <div>
      <button key={key1} className="px-5 py-2 m-2 bg-gray-200 rounded-lg">
        {name}
      </button>
    </div>
  );
};

export default Button;
