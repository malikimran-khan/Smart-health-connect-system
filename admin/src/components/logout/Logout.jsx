import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaPowerOff, FaChevronRight } from 'react-icons/fa';

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear any session data if necessary
        // localStorage.removeItem('token');
    }, []);

    return (
        <div className="flex items-center justify-center min-h-[70vh]">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="glass-card rounded-[3.5rem] p-16 max-w-lg w-full text-center relative overflow-hidden"
            >
                {/* Background Decorative Element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#123499]/5 rounded-bl-full pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#5eaf73]/5 rounded-tr-full pointer-events-none"></div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-10 relative inline-block"
                >
                    <div className="w-24 h-24 rounded-[2.5rem] bg-[#00072d] flex items-center justify-center text-white shadow-2xl relative z-10">
                        <FaPowerOff size={36} />
                    </div>
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-[2.5rem] bg-[#123499]/20 blur-xl"
                    ></motion.div>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-4xl font-black text-[#00072d] mb-4 tracking-tight"
                >
                    Session Terminated
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-400 font-medium mb-12 leading-relaxed"
                >
                    You have been successfully logged out. Your security token has been invalidated and the terminal session has ended.
                </motion.p>

                <div className="flex flex-col gap-4">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate('/')}
                        className="w-full py-5 bg-[#123499] text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-[#123499]/20 flex items-center justify-center gap-3"
                    >
                        Re-Login to Terminal <FaChevronRight size={10} />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => window.location.href = '/'}
                        className="w-full py-5 bg-[#f8fafc] text-[#00072d] font-black text-xs uppercase tracking-[0.2em] rounded-2xl border border-gray-100 hover:bg-gray-50 flex items-center justify-center gap-3"
                    >
                        Return to Home
                    </motion.button>
                </div>

                <p className="mt-12 text-[10px] font-black text-gray-300 uppercase tracking-widest">
                    © Smart Health Connect • Secure Admin Layer
                </p>
            </motion.div>
        </div>
    );
}
