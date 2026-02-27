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
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!email || !password) {
      return alert("Please enter email and password");
    }

    try {
      setLoading(true);

      await api.post("/api/v1/users/auth", {
        email,
        password,
      });

      await fetchUser();
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
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
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md transition-all duration-300">
        
        {/* Heading */}
        <h2 className="text-3xl font-bold text-[#6B3E26] text-center">
          Welcome to Squirll Bites 🐿️
        </h2>

        <p className="text-gray-500 text-center mt-2 mb-8">
          Continue your healthy snacking journey.
        </p>

        {/* Email */}
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#C48A3A]"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-[#C48A3A]"
        />

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={loading}
          className="w-full bg-[#6B3E26] hover:bg-[#5A321D] text-white py-3 rounded-full font-semibold transition-all duration-300 active:scale-95"
        >
          {loading ? "Please wait..." : "Continue"}
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

        {/* Footer Note */}
        <p className="text-center text-xs text-gray-400 mt-6">
          By continuing, you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
}

export default Login;
