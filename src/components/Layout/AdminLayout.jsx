import {Outlet} from "react-router-dom";
import {Home, Package, List} from "lucide-react";
import Sidebar from "../SideBar/Sidebar";
import SidebarItem from "../SideBar/SidebarItem";
import Logo from "../logo/Logo";

const menuItems = [
  {name: "Dashboard", icon: Home, to: "/admin/dashboard"},
  {name: "Products", icon: Package, to: "/admin/products"},
  {name: "Categories", icon: List, to: "/admin/categories"},
];

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex ">
      {/* sidebar with children */}
      <Sidebar title={<Logo />} >
        {menuItems.map((item) => (
          <SidebarItem
            key={item.name}
            {...item}
          />
        ))}
      </Sidebar>

      {/* Main content */}
      <div className="lg:ml-72 w-full p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
