import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Ensure you import from 'react-router-dom'
import { Layout, AuthLayout } from "./components/layout/Layout";
import Home from "./routes/home/Home";
import Profile from "./routes/profile/Profile";
import List from "./routes/list/List";
import Fav from "./routes/fav/Fav";
import Info from "./routes/info/Info";
import Add from "./routes/add/Add";
import Edit from "./routes/edit/Edit";
import {
  addImageLoader,
  editPageLoader,
  favPageLoader,
  homePageLoader,
  infoPageLoader,
  listPageLoader,
  profilePageLoader,
} from "./lib/loader";
import AddImage from "./routes/addImg/AddImage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
          loader: homePageLoader,
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
          loader: favPageLoader,
        },
        {
          path: "/profile",
          element: <Profile />,
          loader: profilePageLoader,
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
  ]);

  return <RouterProvider router={router} />;
};

export default App;
