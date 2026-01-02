import React from 'react';
import { FaSearch, FaBell, FaUserCircle, FaCog } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function AdminNavbar() {
    return (
        <nav className="sticky top-0 z-30 w-full h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 md:px-10 flex items-center justify-between">
            {/* Search Bar */}
            <div className="hidden md:flex items-center bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2.5 w-96 focus-within:border-[#123499] focus-within:ring-2 focus-within:ring-[#123499]/10 transition-all">
                <FaSearch className="text-gray-400 mr-3" />
                <input
                    type="text"
                    placeholder="Search records, doctors, patients..."
                    className="bg-transparent border-none outline-none text-sm w-full text-gray-700"
                />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 md:gap-5 ml-auto">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 text-gray-500 hover:text-[#123499] hover:bg-gray-50 rounded-xl transition-colors relative"
                >
                    <FaBell size={20} />
                    <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 text-gray-500 hover:text-[#123499] hover:bg-gray-50 rounded-xl transition-colors"
                >
                    <FaCog size={20} />
                </motion.button>

                <div className="h-8 w-[1px] bg-gray-200 mx-2 hidden sm:block"></div>

                <div className="flex items-center gap-3 pl-2 group cursor-pointer">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-gray-900 group-hover:text-[#123499] transition-colors">Mathew Anderson</p>
                        <p className="text-[11px] text-[#5eaf73] font-bold uppercase tracking-wider">Super Admin</p>
                    </div>
                    <div className="w-10 h-10 rounded-full border-2 border-[#123499] p-0.5 group-hover:border-[#5eaf73] transition-colors">
                        <img
                            src="https://i.pravatar.cc/150?img=12"
                            alt="Profile"
                            className="w-full h-full rounded-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
}
