import React from "react";
import Button from "./Button";

const list = [
  "All",
  "Live",
  "Gaming",
  "Cricket",
  "Football",
  "WWE",
  "Cooking",
  "News",
  "Songs",
  "Anime",
  "Japan",
];

const ButtonList = () => {
  return (
    <div className="flex ">
      {list.map((item, key) => (
        <Button name={item} key={key} />
      ))}
    </div>
  );
};

export default ButtonList;
