import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Ensure you import from 'react-router-dom'
import Layout from "./components/layout/Layout";
import Home from "./routes/home/Home"; 
import Profile from "./routes/profile/Profile";
import List from "./routes/list/List";
import Fav from "./routes/fav/Fav";
import Info from "./routes/info/Info";
import Add from "./routes/add/Add";
import Edit from "./routes/edit/Edit";

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
          path: "/list",
          element: <List />,
        },
        {
          path: "/fav",
          element: <Fav />,
        },
        {
          path: "/info/:id",
          element: <Info />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/edit/:id",
          element: <Edit />,
        },
        {
          path: "/add",
          element: <Add />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
