import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUserMd, FaLock, FaEnvelope } from 'react-icons/fa';

export default function DoctorLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/doctor/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed');
        setLoading(false);
        return;
      }

      localStorage.setItem('doctorToken', data.token);
      localStorage.setItem('doctor-id', data.doctorId);
      navigate('/dashboard');
      setLoading(false);
    } catch (err) {
      setError('Server error. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0f1e] overflow-hidden relative">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-600/20 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-[450px] p-8 mx-4"
      >
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 md:p-10">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-teal-400 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/20">
              <FaUserMd className="text-3xl text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Doctor Portal</h2>
            <p className="text-gray-400 mt-2 text-sm">Welcome back, Please login to your account</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center font-medium"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
              <div className="relative group">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-teal-400 transition-colors" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@provider.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
              <div className="relative group">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-teal-400 transition-colors" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full relative group overflow-hidden bg-gradient-to-r from-indigo-600 to-teal-500 py-4 rounded-2xl font-bold text-white shadow-lg shadow-indigo-600/20 hover:shadow-teal-500/30 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : 'Sign In'}
              </span>
            </button>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-white/5">
            <p className="text-gray-400 text-sm">
              Don't have an account?{' '}
              <Link to="/doctor-signup" className="text-teal-400 font-bold hover:text-teal-300 transition-colors">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
