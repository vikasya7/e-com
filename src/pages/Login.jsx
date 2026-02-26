import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../context/useAuth";
import { GoogleLogin } from "@react-oauth/google";
import api from "../utils/api";

function Login() {
  const navigate = useNavigate();
  const { fetchUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await api.post("/api/v1/users/login", {
        email,
        password,
      });
      await fetchUser();
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      await api.post("/api/v1/users/google-login", {
        token: credentialResponse.credential,
      });
      await fetchUser();
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#FFF8EE] via-[#F8EDE3] to-[#F3E5D6] px-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-[#6B3E26] text-center">
          Welcome Back
        </h2>
        <p className="text-gray-500 text-center mt-2 mb-8">
          Login to continue your healthy snacking journey.
        </p>

        {/* Email */}
        <input
          type="email"
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#C48A3A]"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-[#C48A3A]"
        />

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-[#6B3E26] hover:bg-[#5A321D] text-white py-3 rounded-full font-semibold transition-all duration-300"
        >
          Login
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Google Login */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => alert("Google Login Failed")}
          />
        </div>

        {/* Signup Link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-[#C48A3A] font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
