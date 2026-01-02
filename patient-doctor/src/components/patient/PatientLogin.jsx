import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserCircle, FaLock, FaEnvelope } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL;

const PatientLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/patients/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setLoginError(data.message || "Login failed");
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("patientId", data.userId);
        navigate("/show-doctor");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[140px]" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[140px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-[480px]"
      >
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl p-8 md:p-12">
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20">
              <FaUserCircle className="text-4xl text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Patient Login</h2>
            <p className="text-gray-400 mt-2 text-sm">Welcome back to Smart Health Connect</p>
          </div>

          {loginError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm text-center font-medium"
            >
              {loginError}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative group">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-inner"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Password</label>
              <div className="relative group">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-inner"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-white font-bold text-lg shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 hover:-translate-y-0.5 active:translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden relative"
            >
              <span className="relative z-10">
                {loading ? "Signing In..." : "Login"}
              </span>
              {loading && (
                <div className="absolute inset-0 bg-white/10 animate-pulse" />
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <p className="text-gray-400">
              New here?{" "}
              <Link to="/patient-signup" className="text-blue-400 font-bold hover:text-blue-300 transition-colors">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PatientLogin;
