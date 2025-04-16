import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Ensure you import from 'react-router-dom'
import { Layout, AuthLayout, AdminLayout } from "./components/layout/Layout";
import Home from "./routes/home/Home";
import Profile from "./routes/profile/Profile";
import List from "./routes/list/List";
import Info from "./routes/info/Info";
import Add from "./routes/add/Add";
import Edit from "./routes/edit/Edit";
import {
  addImageLoader,
  editPageLoader,
  infoPageLoader,
  listPageLoader,
} from "./lib/loader";
import AddImage from "./routes/addImg/AddImage";
import Fav from "./routes/fav/Fav";
import TermsAndConditions from "./routes/TermsAndCondition/TermsAndCondition";
import PrivacyPolicy from "./routes/PrivacyPolicy/PrivacyPolicy";
import About from "./routes/about/About";
import Submit from "./routes/submit/Submit";
import AdminVerify from "./routes/AdminVerify/AdminVerify";
import AdminHome from "./routes/AdminHome/AdminHome";
import AdminUsers from "./routes/AdminUsers/AdminUsers";
import AdminBuses from "./routes/AdminBuses/AdminBuses";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/terms",
          element: <TermsAndConditions />,
        },
        {
          path: "/privacy",
          element: <PrivacyPolicy />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/list",
          element: <List />,
          loader: listPageLoader,
        },
        {
          path: "/info/:id",
          element: <Info />,
          loader: infoPageLoader,
        },
      ],
    },
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          path: "/fav",
          element: <Fav />,
        },
        {
          path: "/submit",
          element: <Submit />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/edit/:id",
          element: <Edit />,
          loader: editPageLoader,
        },
        {
          path: "/add",
          element: <Add />,
        },
        {
          path: "/addImg/:id",
          element: <AddImage />,
          loader: addImageLoader,
        },
      ],
    },
    {
      path: "/admin",   
      element: <AdminLayout />,
      children: [
        {
          path: "",
          element: <AdminHome />,
        },
        {
          path: "verify",
          element: <AdminVerify />,
        },
        {
          path: "users",
          element: <AdminUsers />,
        },
        {
          path: "buses",
          element: <AdminBuses />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
