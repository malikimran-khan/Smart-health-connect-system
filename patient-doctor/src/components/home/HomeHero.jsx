import React from 'react';
import { motion } from 'framer-motion';
import heroimg from '../../assets/Header-image.png';
import { FaCalendarAlt, FaUserMd, FaShieldAlt, FaClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import doctorsData from './doctorsData.js';

const HomeHero = () => {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/show-doctor');
    } else {
      navigate('/patient-login');
    }
  };

  const handleLearnMore = () => {
    navigate('/Blog');
  };

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-[#00072d]">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#0a2472]/20 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-[#5eaf73]/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* Left Content */}
          <div className="lg:w-3/5 space-y-10 text-center lg:text-left">
            <div className="inline-flex items-center space-x-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-[#5eaf73] animate-pulse" />
              <span className="text-xs font-black uppercase tracking-widest text-gray-400">Next-Gen Healthcare</span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight"
            >
              Your Health Journey <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0a2472] to-[#5eaf73]">
                Redefined
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium"
            >
              Experience a premium medical ecosystem where world-class specialists meet cutting-edge technology to prioritize your well-being.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-5"
            >
              <button
                onClick={handleBookAppointment}
                className="group relative flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#0a2472] to-[#123499] text-white rounded-2xl font-bold text-lg shadow-2xl shadow-[#0a2472]/20 hover:shadow-[#0a2472]/40 hover:-translate-y-1 transition-all duration-300"
              >
                <FaCalendarAlt className="mr-3 text-[#5eaf73]" />
                Book Appointment
                <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button
                onClick={handleLearnMore}
                className="flex items-center justify-center px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-all duration-300"
              >
                Learn More
              </button>
            </motion.div>

            {/* Features Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 border-t border-white/5"
            >
              {[
                { icon: <FaShieldAlt className="text-[#5eaf73]" />, label: "Secure Data" },
                { icon: <FaClock className="text-[#0a2472]" />, label: "24/7 Access" },
                { icon: <FaUserMd className="text-[#5eaf73]" />, label: "Top Specialists" }
              ].map((feat, i) => (
                <div key={i} className="flex items-center space-x-3 text-sm font-bold text-gray-400">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5">
                    {feat.icon}
                  </div>
                  <span>{feat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Image Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="lg:w-2/5 relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden border border-white/10 shadow-3xl bg-[#051650]/40 backdrop-blur-sm">
              <img
                src={heroimg}
                alt="Medical Care"
                className="w-full h-auto mix-blend-lighten opacity-90 scale-105"
              />
            </div>

            {/* Floating Accents */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-8 -right-8 p-6 bg-[#00072d]/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl z-20 hidden md:block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#5eaf73]/20 rounded-2xl flex items-center justify-center">
                  <span className="text-xl font-black text-[#5eaf73]">4.9</span>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#5eaf73]/60 mb-1">Top Rated</p>
                  <p className="text-sm font-bold text-white leading-none">Patient Success</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-8 -left-8 p-6 bg-gradient-to-br from-[#0a2472] to-[#123499] rounded-3xl shadow-2xl z-20 hidden md:block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                  <FaUserMd className="text-white text-xl" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-1">Network</p>
                  <p className="text-sm font-bold text-white leading-none">{doctorsData.length}+ Experts</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
