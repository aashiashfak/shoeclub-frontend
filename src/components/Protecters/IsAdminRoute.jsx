import useToastNotification from "@/hooks/SonnerToast";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export const IsAdminRoute = ({children}) => {
  const navigate = useNavigate();
  const userRole = useSelector((state) => state.userAuth.role);
  const showToast = useToastNotification();

  const isAdmin = userRole === "Admin";

  useEffect(() => {
    if (!isAdmin) {
      showToast("You are not authorized to access this page", "error");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [isAdmin, showToast]);

  return isAdmin ? children : null;
};
