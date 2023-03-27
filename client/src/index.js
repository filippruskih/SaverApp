import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Login from "./Login";
import PublicComments from "./components/PublicComments";
import Dashboard from "./Dashboard";
import "./App.css";
import Info from "./components/Info";
import Account from "./components/Account";
import Nav from './components/UI/Nav/Nav';
import Footer from "./components/Footer";
import Logout from './components/Logout';

const AppLayout = () => (
  <>
    <Nav />
    <Outlet />
    <Logout className={'App ${theme}'}/>
    <Footer />
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
        path: "PublicComments",
        element: <PublicComments />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
