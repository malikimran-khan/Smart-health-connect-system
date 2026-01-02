import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTachometerAlt,
  FaUserMd,
  FaUserInjured,
  FaCalendarCheck,
  FaBlog,
  FaShieldAlt,
  FaLock,
  FaBars,
  FaTimes,
  FaChevronRight,
  FaSignOutAlt
} from 'react-icons/fa';

export default function DashBoardSideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setIsOpen(true);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navItems = [
    { to: '/', icon: <FaTachometerAlt />, label: 'Dashboard' },
    { to: '/doctor', icon: <FaUserMd />, label: 'Doctors' },
    { to: '/patient', icon: <FaUserInjured />, label: 'Patients' },
    { to: '/appointments', icon: <FaCalendarCheck />, label: 'Appointments' },
    { to: '/show-blog', icon: <FaBlog />, label: 'Blogs' },
    { to: '/privacy-policy', icon: <FaShieldAlt />, label: 'Privacy Policy' },
    { to: '/security-policy', icon: <FaLock />, label: 'Security Policy' },
    { to: '/logout', icon: <FaSignOutAlt />, label: 'Logout' },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed z-50 top-4 left-4 p-3 bg-[#0a2472] text-white rounded-xl shadow-lg lg:hidden transition-transform active:scale-95"
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      )}

      {/* Sidebar Container */}
      <AnimatePresence mode="wait">
        {(isOpen || !isMobile) && (
          <motion.div
            initial={isMobile ? { x: -300 } : false}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-72 flex flex-col sidebar-glass overflow-hidden transition-all`}
            style={{ backgroundColor: 'var(--primary-navy)' }}
          >
            {/* Logo Section */}
            <div className="p-8 pb-4">
              <div className="flex items-center gap-3 mb-8 px-2">
                <div className="w-10 h-10 bg-gradient-to-br from-[#123499] to-[#5eaf73] rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-black text-xl">S</span>
                </div>
                <div>
                  <h1 className="text-white font-bold text-lg leading-tight">Smart Health</h1>
                  <p className="text-[#5eaf73] text-[10px] font-bold tracking-[0.2em] uppercase">Connect Admin</p>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => isMobile && setIsOpen(false)}
                  className={({ isActive }) =>
                    `group flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 ${isActive
                      ? 'bg-[#123499] text-white shadow-lg'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3.5">
                        <span className={`text-lg transition-colors ${isActive ? 'text-white' : 'group-hover:text-[#5eaf73]'}`}>
                          {item.icon}
                        </span>
                        <span className="font-semibold text-sm tracking-wide">{item.label}</span>
                      </div>
                      {isActive && (
                        <motion.div layoutId="active-indicator">
                          <FaChevronRight className="text-[10px] opacity-60" />
                        </motion.div>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* User Profile / Logout Mini Section */}
            <div className="p-6 mt-auto border-t border-white/10">
              <div className="flex items-center gap-3 px-2">
                <div className="w-11 h-11 rounded-full border-2 border-[#5eaf73] overflow-hidden">
                  <img src="https://i.pravatar.cc/150?img=12" alt="Admin" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-bold text-sm">Mathew Anderson</p>
                  <p className="text-[#5eaf73] text-xs">Super Admin</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Backdrop */}
      {isMobile && isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden"
        />
      )}
    </>
  );
}
