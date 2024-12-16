import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import TopBanner from "../topBanner/TopBanner";
import { AuthContext } from "../../context/AuthContext";
import { Toaster, toast } from "react-hot-toast";

export const Layout = () => {
  return (
    <div className="container">
      <Toaster position="top-center" reverseOrder={false} />

      <Navbar />

      <div className="mt-md-5"></div>
      <Outlet />
    </div>
  );
};

export function AuthLayout() {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    // Show the toast message before redirecting
    toast.error("Please login to access this page", { id: "info" }, {
      style:{
        zIndex: 9999999
      }
    });
    return <Navigate to="/" />;
  }

  return (
    <div className="container">
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <div className="mt-md-5"></div>
      <Outlet />
    </div>
  );
}
