import React, {useEffect, useRef, useState} from "react";
import {Button} from "@/components/ui/button";
import {User, Home, Phone, Info, ShoppingBag, Menu} from "lucide-react";
import {useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import "../../components/Dropdown/dropdown.css";
import ProfileDropdown from "../Dropdown/ProfileDropdown.jsx";
import Logo from "../logo/Logo";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = useSelector((state) => state.userAuth.role === "Admin");

  const isAuthenticated = useSelector(
    (state) => state.userAuth.isAuthenticated
  );

  const activePath = (path) => location.pathname === path;

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const navItems = [
    {
      title: "Home",
      icon: <Home className="w-5 h-5 text-gray-700" />,
      path: "/",
    },
    {
      title: "All Products",
      icon: <ShoppingBag className="w-5 h-5 text-gray-700" />,
      path: "/products",
    },
    {
      title: "Contact Us",
      icon: <Phone className="w-5 h-5 text-gray-700" />,
      path: "/contact",
    },
    {
      title: "About Us",
      icon: <Info className="w-5 h-5 text-gray-700" />,
      path: "/about",
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between px-6 py-3 bg-white shadow-md sticky top-0 z-50">
        {/* Left Side: Heading */}
        <Logo />
        {/* Center: Navigation Links (hidden on small screens) */}
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Button
              key={item.title}
              variant="link"
              className={`text-gray-700 hover:text-black ${
                activePath(item.path) ? " font-bold" : ""
              }`}
              onClick={() => navigate(item.path)}
            >
              {item.title}
            </Button>
          ))}
        </div>

        {/* Right Side: Icon */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              {isAdmin && (
                <div
                  className="text-gray-700 hover:text-black"
                  onClick={() => navigate("/admin/dashboard")}
                >
                  Dashboard
                </div>
              )}
              <div className="relative" ref={dropdownRef}>
                <Button
                  variant="ghost"
                  className="p-2"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <User className="w-5 h-5 text-gray-700" />
                </Button>
                <div
                  className={`Profile-drop-down-menu dropdown-menu absolute right-0 bg-white mt-2 w-48 py-1 rounded-md shadow-lg z-20 ${
                    dropdownOpen ? "active" : "inactive"
                  }`}
                >
                  {dropdownOpen && <ProfileDropdown />}
                </div>
              </div>
            </>
          ) : (
            <Button onClick={() => navigate("/auth/sign-in")}>Sign In</Button>
          )}
        </div>
      </div>

      {/* Bottom Navigation for Small Screens */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="flex justify-around py-2">
          {navItems.map((item) => (
            <div className="flex flex-col" key={item.title}>
              <Button
                variant="ghost"
                className=" items-center p-2 "
                onClick={() => navigate(item.path)}
              >
                {item.icon}
              </Button>
              <p
                className={`text-xs ${
                  activePath(item.path) ? "font-bold" : ""
                }`}
              >
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
