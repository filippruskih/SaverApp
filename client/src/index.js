import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Reset from "./Reset";
import "./App.css";
import Info from "./components/Info";
import Account from "./components/Account";

const AppLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "Dashboard",
        element: <Dashboard />,
      },
      {
        path: "/Info",
        element: <Info />,
      },
      {
        path: "Account",
        element: <Account />,
      },
      {
        path: "Login",
        element: <Login />,
      },
      {
        path: "Register",
        element: <Register />,
      },
      {
        path: "Reset",
        element: <Reset />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
