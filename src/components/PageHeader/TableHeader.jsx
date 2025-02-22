import {Button} from "../ui/button";
import {Plus} from "lucide-react";
import {useNavigate} from "react-router-dom";
import React from "react";

const TableHeader = ({title, link}) => {
    const navigate = useNavigate()
  return (
    <div className="flex justify-between items-center mb-6 ">
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      <Button
        type="button"
        onClick={() => navigate(link.pathname, {state: link.state})}
        variant="outline"
      >
        <Plus size={16} /> Add item
      </Button>
    </div>
  );
};

export default TableHeader;
