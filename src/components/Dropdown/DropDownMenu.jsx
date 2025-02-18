import React from "react";

const DropDownMenu = ({icon, title}) => {
  return (
    <div className="flex">
      <div className="mt-1 text-black">{icon}</div>
      <div className="ml-2 hover:text-black">{title}</div>
    </div>
  );
};

export default DropDownMenu;
