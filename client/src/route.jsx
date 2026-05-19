import { createBrowserRouter } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import SignUp from "./features/auth/pages/SignUp";
import Feed from "./features/posts/pages/Feed";
import Home from "./features/home/pages/Home";
import CreatePost from "./features/posts/pages/CreatePost";

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
    path: "/home",
    element: <Home />,
    children: [
      {
        index: true,
        element: <Feed />,
      },
      {
        path: "createpost",
        element: <CreatePost />,
      },
    ],
  },
]);
