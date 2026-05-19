import { createBrowserRouter } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import SignUp from "./features/auth/pages/SignUp";
import Feed from "./features/posts/pages/Feed";
import Home from "./features/home/pages/Home";

export const routes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/feed",
    element: <Home />,
    children: [
      {
        index: true,
        element: <Feed />,
      },
    ],
  },
]);
