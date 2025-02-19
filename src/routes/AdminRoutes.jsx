import {Route, Routes} from "react-router-dom";
import React from "react";
import Dashboard from "@/pages/admin/Dashboard";
import Categories from "@/pages/admin/Categories";
import Products from "@/pages/admin/Products";
import {IsAdminRoute} from "@/components/Protecters/isAdminRoute";
import AdminLayout from "@/components/Layout/AdminLayout";

const AdminRoutes = () => {
  return (
    <IsAdminRoute>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="categories" element={<Categories />} />
          <Route path="products" element={<Products />} />
        </Route>
      </Routes>
    </IsAdminRoute>
  );
};

export default AdminRoutes;
