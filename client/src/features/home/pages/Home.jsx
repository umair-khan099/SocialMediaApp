import React from "react";
import Feed from "../../posts/pages/Feed";
import SideBar from "../components/SideBar";

const Home = () => {
  return (
    <div className="flex h-screen bg-gray-900">
      <SideBar />
      <Feed />
    </div>
  );
};

export default Home;
