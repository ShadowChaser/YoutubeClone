import React from "react";

const Comment = ({ data }) => {
  const { name, text, replies } = data;
  return (
    <div className="flex my-2 bg-gray-100 p-2 rounded-lg">
      <img
        className="h-10 w-10"
        alt="user"
        src="https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png"
      />
      <div className="px-3">
        <p className="font-bold">{name}</p>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Comment;
