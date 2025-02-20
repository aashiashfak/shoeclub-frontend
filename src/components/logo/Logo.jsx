import React from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "@/assets/images/logo.png";


const Logo = () => {
    const navigate = useNavigate()
  return (
    <div className="flex relative" onClick={()=> navigate('/')}>
      <img src={logoImg} alt="" className="object-cover w-14 h-14 " />
      <div className="absolute text-xl font-bold mt-3 left-10 whitespace-nowrap">
        SHOE CLUB
      </div>
    </div>
  );
};

export default Logo;
