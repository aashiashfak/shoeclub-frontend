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
      <div className="pt-4 md:pt-0 pb-16 md:pb-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
        </Routes>
      </div>
    </>
  );
};

export default UserRoutes;
