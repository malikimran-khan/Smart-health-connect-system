import React, { useState } from "react";
import countryCodes from "./countryCodes";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserMd, FaHospital, FaIdCard, FaUpload, FaPhone, FaLock, FaEnvelope, FaUser, FaStethoscope } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL;

// Reusable Input Component
const ModernInput = ({ label, icon: Icon, type = "text", name, value, onChange, error, required, placeholder }) => (
  <div className="space-y-1.5 w-full">
    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">{label}</label>
    <div className="relative group">
      {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-teal-400 transition-colors" />}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={`w-full bg-white/5 border border-white/10 rounded-2xl py-3 ${Icon ? 'pl-12' : 'px-4'} pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all`}
      />
    </div>
    {error && <p className="text-red-400 text-[10px] mt-1 ml-1">{error}</p>}
  </div>
);

const DoctorSignup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    specialty: "",
    licenseNumber: "",
    yearsOfExperience: "",
    hospitalAffiliation: "",
    bio: ""
  });
  const [selectCountry, setSelectCountry] = useState("+92");
  const [documents, setDocuments] = useState({});
  const [errors, setErrors] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const specialties = ["Cardiology", "Dermatology", "Endocrinology", "Pediatrics", "Neurology", "General Medicine", "Surgery", "Other"];
  const requiredDocs = ["degreeCertificate", "licenseDocument", "idProof"];

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleDocumentUpload = (e, docType) => {
    const file = e.target.files[0];
    if (file) {
      setDocuments(prev => ({ ...prev, [docType]: file }));
    }
  };

  const handleProfileImageUpload = e => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "Required";
    if (!formData.lastName) newErrors.lastName = "Required";
    if (!formData.email) newErrors.email = "Required";
    if (!formData.password || formData.password.length < 8) newErrors.password = "Min 8 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.specialty) newErrors.specialty = "Required";
    if (!formData.licenseNumber) newErrors.licenseNumber = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        form.append(key, value);
      });

      Object.entries(documents).forEach(([key, file]) => {
        if (file) form.append(key, file);
      });

      form.append("phone", selectCountry + formData.phone);
      if (profileImage) form.append("profileImage", profileImage);

      const res = await fetch(`${API_URL}/api/doctor/register`, {
        method: "POST",
        body: form
      });

      const data = await res.json();

      if (res.ok) {
        navigate('/doctor-login');
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  };

  const prevStep = () => setStep(prev => prev - 1);

  return (
    <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-600/20 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-[550px]"
      >
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl p-8 md:p-10">
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-teal-400 rounded-2xl flex items-center justify-center mb-4 shadow-lg active:scale-95 transition-transform">
              <FaUserMd className="text-3xl text-white" />
            </div>
            <h2 className="text-3xl font-extrabold text-white">Join as a Doctor</h2>
            <div className="flex gap-2 mt-4">
              {[1, 2, 3].map(i => (
                <div key={i} className={`h-1.5 w-8 rounded-full transition-all duration-300 ${step >= i ? 'bg-teal-400' : 'bg-white/10'}`} />
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <ModernInput label="First Name" name="firstName" icon={FaUser} value={formData.firstName} onChange={handleChange} required error={errors.firstName} placeholder="John" />
                    <ModernInput label="Last Name" name="lastName" icon={FaUser} value={formData.lastName} onChange={handleChange} required error={errors.lastName} placeholder="Doe" />
                  </div>
                  <ModernInput label="Email Address" name="email" type="email" icon={FaEnvelope} value={formData.email} onChange={handleChange} required error={errors.email} placeholder="john@example.com" />
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Phone Number</label>
                    <div className="flex gap-3">
                      <select
                        value={selectCountry}
                        onChange={e => setSelectCountry(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-2xl px-3 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 appearance-none text-sm"
                      >
                        {countryCodes.map(c => <option key={c.code} value={c.code} className="bg-[#1a1f2e]">{c.code}</option>)}
                      </select>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="300 1234567"
                        className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all text-sm"
                      />
                    </div>
                  </div>
                  <ModernInput label="Password" name="password" type="password" icon={FaLock} value={formData.password} onChange={handleChange} required error={errors.password} placeholder="••••••••" />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Medical Specialty</label>
                    <div className="relative group">
                      <FaStethoscope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-teal-400 transition-colors" />
                      <select
                        name="specialty"
                        value={formData.specialty}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                      >
                        <option value="" className="bg-[#1a1f2e]">Select Specialty</option>
                        {specialties.map(s => <option key={s} value={s} className="bg-[#1a1f2e]">{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <ModernInput label="License Number" name="licenseNumber" icon={FaIdCard} value={formData.licenseNumber} onChange={handleChange} required placeholder="MD-123456" />
                  <ModernInput label="Years of Experience" name="yearsOfExperience" type="number" icon={FaStethoscope} value={formData.yearsOfExperience} onChange={handleChange} required placeholder="5" />
                  <ModernInput label="Hospital Affiliation" name="hospitalAffiliation" icon={FaHospital} value={formData.hospitalAffiliation} onChange={handleChange} placeholder="City General Hospital" />
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Professional Bio</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Tell us about your medical background..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Profile Image</label>
                      <label className="flex items-center gap-3 bg-white/5 border border-dashed border-white/20 hover:border-teal-500/50 rounded-2xl p-4 cursor-pointer transition-colors group">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-teal-500/10">
                          <FaUpload className="text-gray-400 group-hover:text-teal-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-300 font-medium">{profileImage ? profileImage.name : "Select Image"}</p>
                          <p className="text-[10px] text-gray-500">JPG, PNG up to 2MB</p>
                        </div>
                        <input type="file" accept="image/*" onChange={handleProfileImageUpload} className="hidden" />
                      </label>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Documents (Degrees/License)</label>
                      <div className="grid grid-cols-1 gap-2">
                        {requiredDocs.map(doc => (
                          <label key={doc} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-3 cursor-pointer hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-3">
                              <FaIdCard className="text-gray-500" />
                              <span className="text-xs text-gray-300 capitalize">{doc.replace(/([A-Z])/g, " $1")}</span>
                            </div>
                            <span className="text-[10px] text-teal-400">{documents[doc] ? "Uploaded" : "Upload File"}</span>
                            <input type="file" onChange={e => handleDocumentUpload(e, doc)} className="hidden" />
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-4 pt-4">
              {step > 1 && (
                <button type="button" onClick={prevStep} className="flex-1 py-4 px-6 rounded-2xl border border-white/10 text-white font-semibold hover:bg-white/5 transition-all">Back</button>
              )}
              {step < 3 ? (
                <button type="button" onClick={nextStep} className="flex-[2] py-4 bg-gradient-to-r from-indigo-600 to-teal-500 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/20 active:scale-95 transition-all">Next Step</button>
              ) : (
                <button type="submit" disabled={loading} className="flex-[2] py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-2xl shadow-lg shadow-teal-500/20 active:scale-95 transition-all">
                  {loading ? "Registering..." : "Complete Registration"}
                </button>
              )}
            </div>

            <div className="mt-8 text-center pt-6 border-t border-white/5">
              <p className="text-gray-400 text-sm">
                Already have an account?{' '}
                <Link to="/doctor-login" className="text-teal-400 font-bold hover:text-teal-300 transition-colors">Log In</Link>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default DoctorSignup;
