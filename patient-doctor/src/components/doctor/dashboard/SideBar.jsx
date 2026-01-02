import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaComments, FaCalendarCheck, FaClinicMedical } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function SideBar() {
  const links = [
    { to: "/dashboard/home", label: "Overview", icon: <FaHome /> },
    { to: "/dashboard/about", label: "My Profile", icon: <FaInfoCircle /> },
    { to: "/dashboard/chat", label: "Messages", icon: <FaComments /> },
    { to: "/dashboard/appointment", label: "Appointments", icon: <FaCalendarCheck /> },
  ];

  return (
    <div className="w-80 bg-[#051650] h-full flex flex-col border-r border-white/5 shadow-2xl overflow-hidden relative">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0a2472]/20 to-transparent pointer-events-none" />

      {/* Brand Section */}
      <div className="p-8 pb-12 relative z-10">
        <div className="flex items-center space-x-3 group cursor-default">
          <div className="w-10 h-10 bg-[#0a2472] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <FaClinicMedical className="text-[#5eaf73] text-xl" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">
            Port<span className="text-[#5eaf73]">al</span>
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6 space-y-4 relative z-10">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-6 ml-4">Main Menu</p>

        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `
              group relative flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all duration-300
              ${isActive
                ? 'bg-[#0a2472] text-white shadow-xl shadow-[#0a2472]/20 border border-white/10'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
              }
            `}
          >
            {({ isActive }) => (
              <>
                <div className={`text-xl transition-transform group-hover:scale-110 ${isActive ? 'text-[#5eaf73]' : 'text-gray-500 group-hover:text-white'}`}>
                  {link.icon}
                </div>
                <span>{link.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute left-0 w-1.5 h-6 bg-[#5eaf73] rounded-r-full"
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer / Account Section */}
      <div className="p-8 border-t border-white/5 relative z-10">
        <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
          <p className="text-[10px] font-black text-[#5eaf73] uppercase tracking-widest mb-1">Status</p>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-[#5eaf73] rounded-full animate-pulse" />
            <span className="text-white font-bold text-sm">System Online</span>
          </div>
        </div>
      </div>
    </div>
  );
}
