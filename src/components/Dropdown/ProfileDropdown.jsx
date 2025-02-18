import React from "react";
import DropDownMenu from "./DropDownMenu";
import {User, LogOut, Heart, ShoppingCart} from "lucide-react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {logout} from "@/redux/Slices/AuthSlice";

const ProfileDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
  };

  const menuItems = [
    {
      title: "My Profile",
      icon: <User className="w-5 h-5 text-black" />,
      path: "/profile",
    },
    {
      title: "Wishlist",
      icon: <Heart className="w-5 h-5 text-black" />,
      path: "/wishlist",
    },
    {
      title: "Cart",
      icon: <ShoppingCart className="w-5 h-5 text-black" />,
      path: "/cart",
    },
  ];

  return (
    <div className="text-sm text-black">
      {menuItems.map((item, index) => (
        <div key={index}>
          <div
            className="px-5 py-3 cursor-pointer"
            onClick={() => navigate(item.path)}
          >
            <DropDownMenu icon={item.icon} title={item.title} />
          </div>
          <hr className="w-[170px] mx-auto bg-gray-400 h-px border-none" />
        </div>
      ))}
      <div className="px-5 py-3 cursor-pointer" onClick={handleLogout}>
        <DropDownMenu
          icon={<LogOut className="w-4 h-4 text-black" />}
          title="Logout"
        />
      </div>
    </div>
  );
};

export default ProfileDropdown;
