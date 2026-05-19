import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { handleLogin, loading } = useAuth();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const responce = await handleLogin(userInfo, password);
    console.log(responce);
    navigate("/home");
  };

  if (loading) {
    return <h1>loading....</h1>;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-white/80">Login to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-white font-medium text-sm">
              Username or Email
            </label>
            <input
              value={userInfo}
              type="text"
              placeholder="Enter your username or email"
              onChange={(e) => setUserInfo(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-white font-medium text-sm">
              Password
            </label>
            <input
              value={password}
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white text-purple-600 font-semibold py-3 rounded-lg hover:bg-opacity-90 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Login
          </button>

          <p className="text-center text-white/80 text-sm">
            Don't have an account?{" "}
            <Link
              to={"/signup"}
              className="text-white font-semibold hover:underline cursor-pointer"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
