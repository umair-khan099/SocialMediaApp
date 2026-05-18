import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "http://localhost:3000/api/auth/register",
      {
        userName: username,
        email,
        password,
      },
      { withCredentials: true },
    );
  };
  console.log(username, email, password);
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-white/80">Join our social media community</p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-white font-medium text-sm">
              Username
            </label>
            <input
              value={username}
              type="text"
              placeholder="Choose a username"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-white font-medium text-sm">
              Email
            </label>
            <input
              value={email}
              type="email"
              placeholder="Enter your email address"
              onChange={(e) => setEmail(e.target.value)}
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
              placeholder="Create a strong password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white text-purple-600 font-semibold py-3 rounded-lg hover:bg-opacity-90 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Sign Up
          </button>

          <p className="text-center text-white/80 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-white font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
