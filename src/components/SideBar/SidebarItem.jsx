import {NavLink} from "react-router-dom";

const SidebarItem = ({icon: Icon, name, to}) => (
  <NavLink
    to={to}
    className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-200"
  >
    <Icon className="w-5 h-5" />
    <span className="text-sm">{name}</span>
  </NavLink>
);

export default SidebarItem;
