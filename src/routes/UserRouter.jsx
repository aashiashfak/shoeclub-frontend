import React from "react";
import {Route, Routes} from "react-router-dom";
import Home from "../pages/user/Home";
import Navbar from "@/components/Layout/Navbar";
import AllProducts from "@/pages/user/AllProducts";

const UserRoutes = () => {
  return (
    <>
      <Navbar />
      {/* Main Content */}
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
        </Routes>
      </div>
    </>
  );
};

export default UserRoutes;
