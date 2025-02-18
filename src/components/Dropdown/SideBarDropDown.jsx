import React, {useState, useRef} from "react";
import {ChevronDown, ChevronUp} from "lucide-react";

const SideBarDropdown = ({title, children}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);

  const toggleDropdown = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full">
      {/* Dropdown Header */}
      <div
        className="flex justify-between items-center p-4   cursor-pointer"
        onClick={toggleDropdown}
      >
        <span className="font-medium">{title}</span>
        <ChevronDown
          className={`transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
        />
      </div>

      {/* Dropdown Content */}
      <div
        ref={contentRef}
        className={`overflow-hidden bg-gray-100 transition-all duration-500 ease-in-out border-b`}
        style={{
          maxHeight: isExpanded
            ? `${contentRef.current.scrollHeight}px`
            : "0px",
        }}
      >
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default SideBarDropdown;
