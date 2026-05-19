import React from "react";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./features/auth/auth.context";
import { routes } from "./route";
import { PostProvider } from "./features/posts/post.context";

const App = () => {
  return (
    <div className="h-screen w-full">
      <AuthProvider>
        <PostProvider>
          <RouterProvider router={routes} />,
        </PostProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
