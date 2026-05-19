import React from "react";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router";

const Home = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBar />
      <div className="flex-1 w-full lg:ml-0">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
  