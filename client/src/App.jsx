/* eslint-disable no-unused-vars */
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/user/LoginPage";
import SignUp from "./pages/user/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserRoutes } from "./routes/UserRoutes";
import React, { useEffect, useState } from "react";
import { OrganizerRoutes } from "./routes/OrganizerRoutes";
import { PlayerRoutes } from "./routes/PlayerRoutes";

const App = () => {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      setAuth(true);
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <SignUp />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },

   UserRoutes,
   OrganizerRoutes,
   PlayerRoutes
  ]);

  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default App;
