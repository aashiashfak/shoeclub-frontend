import {Route, Routes} from "react-router-dom";
import React from "react";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
// import SignIn from "@/pages/Authentication/SignIn";

const AuthRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </div>
  );
};

export default AuthRoutes;
