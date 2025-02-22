import {useDispatch} from "react-redux";
import {NavLink} from "react-router-dom";
import { toggleSidebar } from "@/redux/Slices/sidebarSlice"; 

const SidebarItem = ({icon: Icon, name, to}) => {
  const dispatch = useDispatch(); 

  return (
    <NavLink
      to={to}
      className={({isActive}) =>
        `flex items-center gap-3 p-3 ${
          isActive
            ? "bg-gray-300 text-black font-medium"
            : "text-gray-700 hover:bg-gray-200"
        }`
      }
      onClick={()=>dispatch(toggleSidebar())} 
    >
      <Icon className="w-5 h-5" />
      <span className="text-sm">{name}</span>
    </NavLink>
  );
};

export default SidebarItem;
