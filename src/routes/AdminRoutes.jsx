import {Route, Routes} from "react-router-dom";
import React from "react";
import Dashboard from "@/pages/admin/Dashboard";
import Categories from "@/pages/admin/Categories";
import Products from "@/pages/admin/Products";
import {IsAdminRoute} from "@/components/Protecters/isAdminRoute";
import AdminLayout from "@/components/Layout/AdminLayout";
import ProductForm from "@/pages/admin/ProductForm";
import Sizes from "@/pages/admin/Sizes";
import Images from "@/pages/admin/Images";
import ImageCrud from "@/pages/admin/ImageCrud";

const AdminRoutes = () => {
  return (
    <IsAdminRoute>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="categories" element={<Categories />} />
          <Route path="products" element={<Products />} />
          <Route path="sizes" element={<Sizes />} />
          <Route path="Images" element={<Images />} />
        </Route>
        <Route path="product-form" element={<ProductForm />} />
        <Route path="image-form" element={<ImageCrud />} />
      </Routes>
    </IsAdminRoute>
  );
};

export default AdminRoutes;
