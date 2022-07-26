import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "../pages/dashboard";

function RequireAuth({ children }) {
  return children;
}

const ResoLabRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export default ResoLabRoutes;
