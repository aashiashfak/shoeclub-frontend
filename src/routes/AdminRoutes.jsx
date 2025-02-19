import {Route, Routes} from "react-router-dom";
import React from "react";
import Dashboard from "@/pages/admin/Dashboard";
import {IsAdminRoute} from "@/components/Protecters/isAdminRoute";

const AdminRoutes = () => {
  return (
    <IsAdminRoute>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </IsAdminRoute>
  );
};

export default AdminRoutes;
