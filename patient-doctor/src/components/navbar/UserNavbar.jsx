import React, { useState, useEffect } from 'react';
import {
  FaUserMd,
  FaCalendarAlt,
  FaBlog,
  FaChevronDown,
  FaSignInAlt,
  FaClinicMedical,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const UserNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [doctorSpecialties, setDoctorSpecialties] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    async function fetchSpecialties() {
      try {
        const res = await axios.get(`${API_URL}/api/doctor/all-doctor`);
        const specialties = [...new Set(res.data.map(doc => doc.specialty))];
        setDoctorSpecialties(specialties);
      } catch (err) {
        console.error('Failed to fetch specialties:', err);
      }
    }
    fetchSpecialties();
  }, []);

  const toggleDropdown = () => setDropdownOpen(prev => !prev);

  const handleAppointment = (specialty = null) => {
    const token = localStorage.getItem('token');
    if (specialty) localStorage.setItem('selectedSpecialty', specialty);
    if (token) {
      navigate('/show-doctor');
    } else {
      navigate('/login');
    }
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  const navLinks = [
    { name: 'Find Doctor', icon: <FaUserMd />, dropdown: true },
    { name: 'Appointment', icon: <FaCalendarAlt />, path: '/show-doctor', action: handleAppointment },
    { name: 'Blog', icon: <FaBlog />, path: '/Blog' },
    { name: 'Join as Doctor', path: '/doctor-login' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'py-3 bg-[#00072d]/80 backdrop-blur-xl border-b border-white/10 shadow-2xl' : 'py-6 bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-3 group"
          onClick={() => setMenuOpen(false)}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-[#0a2472] to-[#5eaf73] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <FaClinicMedical className="text-white text-xl" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">
            MediCare<span className="text-[#5eaf73]">+</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              {link.dropdown ? (
                <div>
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center px-4 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300 font-medium"
                  >
                    {link.icon && <span className="mr-2 opacity-70 group-hover:opacity-100">{link.icon}</span>}
                    {link.name}
                    <FaChevronDown className={`ml-2 text-[10px] transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute left-0 mt-2 w-56 bg-[#051650] border border-white/10 rounded-2xl shadow-2xl py-3 overflow-hidden backdrop-blur-2xl"
                      >
                        {doctorSpecialties.map((specialty, i) => (
                          <button
                            key={i}
                            onClick={() => handleAppointment(specialty)}
                            className="block w-full text-left px-5 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors font-medium"
                          >
                            {specialty}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  onClick={() => link.action ? link.action() : navigate(link.path)}
                  className={`flex items-center px-4 py-2 rounded-xl transition-all duration-300 font-medium ${location.pathname === link.path ? 'text-[#5eaf73] bg-[#5eaf73]/10' : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {link.icon && <span className="mr-2 opacity-70 group-hover:opacity-100">{link.icon}</span>}
                  {link.name}
                </button>
              )}
            </div>
          ))}

          <div className="w-[1px] h-8 bg-white/10 mx-4" />

          <button
            onClick={() => navigate('/login')}
            className="flex items-center px-6 py-2.5 bg-gradient-to-r from-[#0a2472] to-[#123499] text-white rounded-xl font-bold shadow-lg shadow-[#0a2472]/20 hover:shadow-[#0a2472]/40 hover:-translate-y-0.5 active:translate-y-0.5 transition-all duration-300"
          >
            <FaSignInAlt className="mr-2" />
            Sign In
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center text-white border border-white/10 active:scale-90 transition-transform"
        >
          {menuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#00072d] border-b border-white/10 overflow-hidden"
          >
            <div className="px-6 py-8 space-y-4">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.dropdown ? (
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-widest px-4 mb-2">{link.name}</div>
                      <div className="grid grid-cols-2 gap-2">
                        {doctorSpecialties.map((specialty, i) => (
                          <button
                            key={i}
                            onClick={() => handleAppointment(specialty)}
                            className="bg-white/5 px-4 py-3 rounded-xl text-sm text-gray-300 text-left font-medium"
                          >
                            {specialty}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => link.action ? link.action() : navigate(link.path)}
                      className="w-full flex items-center px-4 py-4 rounded-xl bg-white/5 text-gray-300 font-medium"
                    >
                      {link.icon && <span className="mr-3 opacity-60">{link.icon}</span>}
                      {link.name}
                    </button>
                  )}
                </div>
              ))}
              <div className="pt-4">
                <button
                  onClick={() => navigate('/login')}
                  className="w-full py-4 bg-gradient-to-r from-[#0a2472] to-[#123499] text-white rounded-xl font-bold shadow-xl"
                >
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default UserNavbar;
