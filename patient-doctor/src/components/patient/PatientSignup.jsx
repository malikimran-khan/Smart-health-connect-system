import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import countryCodes from "./countryCodes";
import { motion } from "framer-motion";
import { FaUserPlus, FaEnvelope, FaUser, FaPhone, FaLock, FaUpload, FaChevronRight } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL;

const PatientSignup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "+92",
    password: "",
    profileImage: null,
  });

  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageName, setImageName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      if (value.length > 0 && value.length < 8) {
        setPasswordError("Password must be at least 8 characters");
      } else {
        setPasswordError("");
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profileImage: file }));
      setImageName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordError) return;
    setFormError("");
    setLoading(true);

    try {
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'profileImage' && value) {
          submitData.append(key, value);
        } else if (key !== 'profileImage') {
          submitData.append(key, value);
        }
      });

      const response = await fetch(`${API_URL}/api/patients/register`, {
        method: "POST",
        body: submitData,
      });

      const data = await response.json();

      if (!response.ok) {
        setFormError(data.message || "Registration failed");
      } else {
        navigate("/login");
      }
    } catch (error) {
      setFormError("Server error. Please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[140px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-emerald-600/10 rounded-full blur-[140px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-[600px]"
      >
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl p-8 md:p-12">
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg active:scale-95 transition-transform">
              <FaUserPlus className="text-3xl text-white" />
            </div>
            <h2 className="text-3xl font-extrabold text-white">Create Account</h2>
            <p className="text-gray-400 mt-2 text-sm text-center">Join Smart Health Connect as a Patient</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">First Name</label>
                <div className="relative group">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-emerald-400 transition-colors" />
                  <input name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="John" className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Last Name</label>
                <div className="relative group">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-emerald-400 transition-colors" />
                  <input name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Doe" className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all" />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative group">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-emerald-400 transition-colors" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Phone Number</label>
              <div className="flex gap-3">
                <select name="countryCode" value={formData.countryCode} onChange={handleChange} className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 appearance-none text-sm">
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.dial_code} className="bg-[#1a1f2e]">
                      {country.dial_code}
                    </option>
                  ))}
                </select>
                <div className="relative flex-1 group">
                  <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-emerald-400 transition-colors" />
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="300 1234567" className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all" />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Password</label>
              <div className="relative group">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-emerald-400 transition-colors" />
                <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="••••••••" className={`w-full bg-white/5 border ${passwordError ? 'border-red-500/50' : 'border-white/10'} rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all`} />
              </div>
              {passwordError && <p className="text-red-400 text-[10px] mt-1 ml-1">{passwordError}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Profile Image</label>
              <label className="flex items-center gap-4 bg-white/5 border border-dashed border-white/20 hover:border-emerald-500/50 rounded-2xl p-4 cursor-pointer transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-emerald-500/10 transition-colors">
                  <FaUpload className="text-gray-400 group-hover:text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-300 font-medium">{imageName || "Choose an image"}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-tight">JPG, PNG up to 5MB</p>
                </div>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>

            {formError && (
              <p className="text-red-400 text-sm text-center font-medium bg-red-500/10 py-3 rounded-xl border border-red-500/20">{formError}</p>
            )}

            <button
              type="submit"
              disabled={loading || passwordError}
              className="w-full h-14 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-2xl text-white font-bold text-lg shadow-lg shadow-blue-500/20 hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden relative"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? "Creating Account..." : "Sign Up Now"}
                {!loading && <FaChevronRight className="text-sm group-hover:translate-x-1 transition-transform" />}
              </span>
            </button>

            <p className="text-center text-gray-400 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors">Log In</Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default PatientSignup;
