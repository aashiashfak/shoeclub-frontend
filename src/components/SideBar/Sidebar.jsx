import React, {useState} from "react";
import {Menu, X} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "@/redux/Slices/sidebarSlice";
import { useLocation } from "react-router-dom";

const Sidebar = ({title, children,}) => {
    const isOpen = useSelector((state) => state.sidebar.isOpen);
    const dispatch = useDispatch();
    const location = useLocation()
    const path = location.pathname
    const handleToggleSidebar = () => {
      dispatch(toggleSidebar()); // Dispatch the toggleSidebar action
    };

  return (
    <div className="min-h-screen flex z-50 fixed shadow-inner p-0 lg:p-1 bg-gray-100">
      {!isOpen && path !== '/products' && (
        <button
          className="lg:hidden text-black fixed top-14  p-1 lg:p-3 rounded-full bg-black bg-opacity-50 left-4 z-50"
          onClick={handleToggleSidebar}
        >
          {<Menu />}
        </button>
      )}
      {/* Sidebar for all screens */}
      <div
        className={`fixed min-h-screen lg:relative lg:w-64 w-full h-full shadow-xl bg-gray-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:block`}
      >
        {/* Sidebar content */}
        <div className="flex justify-between items-center p-2 border-b border-gray-700">
          <div className="text-md font-semibold">{title}</div>
          <button className="lg:hidden" onClick={handleToggleSidebar}>
            <X />
          </button>
        </div>
        <div className=" ">{children}</div>
      </div>
    </div>
  );
};

export default Sidebar;
