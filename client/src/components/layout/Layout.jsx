import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import TopBanner from "../topBanner/TopBanner";
import { AuthContext } from "../../context/AuthContext";
import { Toaster, toast } from "react-hot-toast";
import DismissibleToast from "../dismissibleToast/DismissibleToast";
import Footer from "../footer/Footer";

export const Layout = () => {
  return (
    <div className="container">
      <Toaster position="top-center" reverseOrder={false} />

      <Navbar />

      <div className="mt-md-5"></div>
      <Outlet />
      <Footer />
    </div>
  );
};

export function AuthLayout() {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    // Show the toast message before redirecting
    toast(
      (t) => (
        <DismissibleToast
          message="Please login to access that page"
          toastProps={t}
        />
      ),
      { icon: "🔔", duration: 5000, id: "Please login to access that page" }
    );
    return <Navigate to="/" />;
  }

  return (
    <div className="container">
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <div className="mt-md-5"></div>
      <Outlet />
      <Footer />
    </div>
  );
}
