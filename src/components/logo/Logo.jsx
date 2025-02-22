import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logoImg from "@/assets/images/logo.png";
import { Menu } from "lucide-react";
import { useDispatch } from "react-redux";
import { closeSidebar, toggleSidebar } from "@/redux/Slices/sidebarSlice";



const Logo = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const path = location.pathname
    const dispatch = useDispatch()
  return (
    <div className="flex ">
      {path === "/products" && (
        <Menu
          className="mt-4 md:hidden"
          onClick={() => dispatch(toggleSidebar())}
        />
      )}
      <div className="flex relative" onClick={() => {navigate("/"), dispatch(closeSidebar())}}>
        <img src={logoImg} alt="" className="object-cover w-14 h-14 " />
        <div className="absolute text-xl font-bold mt-3 left-10 whitespace-nowrap">
          SHOE CLUB
        </div>
      </div>
    </div>
  );
};

export default Logo;
