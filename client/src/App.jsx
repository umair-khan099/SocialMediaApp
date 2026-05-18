import React from "react";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./features/auth/auth.context";
import { routes } from "./route";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <RouterProvider router={routes} />,
      </AuthProvider>
    </div>
  );
};

export default App;
