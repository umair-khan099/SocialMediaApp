import { createBrowserRouter } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import SignUp from "./features/auth/pages/SignUp";

export const routes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);
