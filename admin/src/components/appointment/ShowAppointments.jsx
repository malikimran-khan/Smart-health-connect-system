import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarCheck, FaClock, FaUserMd, FaUserCircle, FaCreditCard, FaEllipsisV, FaEye, FaTrash } from 'react-icons/fa';

export default function ShowAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/appointment/all')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        setAppointments(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center p-20">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 border-4 border-[#123499]/20 border-t-[#123499] rounded-full"
      />
    </div>
  );

  if (error) return (
    <div className="glass-card p-10 rounded-[2rem] text-center">
      <p className="text-red-500 font-bold mb-4">Verification Error: {error}</p>
      <button onClick={() => window.location.reload()} className="px-6 py-2 bg-[#123499] text-white rounded-xl text-xs font-black uppercase tracking-widest">Retry Connection</button>
    </div>
  );

  return (
    <div className="flex flex-col gap-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <h2 className="text-4xl font-black text-[#00072d] tracking-tight mb-2">Appointments</h2>
          <p className="text-gray-400 font-medium">Manage and schedule clinical consultations efficiently.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-6 py-3 bg-[#123499] text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-[#123499]/20 hover:scale-105 transition-transform">Schedule New</button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="glass-card rounded-[3rem] overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-[#f8fafc]/50">
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Doctor Information</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Schedule</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Patient Details</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Payment</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {appointments.map((app, index) => (
                <motion.tr
                  key={app._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-[#f8fafc] transition-colors group cursor-default"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#123499]/10 text-[#123499] flex items-center justify-center">
                        <FaUserMd size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-[#00072d]">{app.doctorName}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Assigned Doctor</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-gray-600">
                        <FaCalendarCheck size={12} className="text-[#5eaf73]" />
                        <span className="text-xs font-bold">{app.appointmentDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <FaClock size={12} />
                        <span className="text-[11px] font-medium">{app.appointmentTime}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <FaUserCircle size={18} className="text-gray-200 group-hover:text-[#0a2472] transition-colors" />
                      <div>
                        <p className="text-xs font-bold text-[#051650]">{app.patientName}</p>
                        <p className="text-[10px] text-gray-400 truncate max-w-[150px]">{app.patientEmail}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#f1f5f9] rounded-lg w-fit">
                      <FaCreditCard size={12} className="text-[#123499]" />
                      <span className="text-[10px] font-black text-gray-600 uppercase tracking-wider">{app.paymentMethod}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2.5 text-gray-400 hover:text-[#123499] hover:bg-[#123499]/10 rounded-xl transition-all"><FaEye size={14} /></button>
                      <button className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><FaTrash size={14} /></button>
                      <button className="p-2.5 text-gray-300 hover:text-gray-600 rounded-xl transition-all"><FaEllipsisV size={14} /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {appointments.length === 0 && (
          <div className="p-20 text-center">
            <p className="text-gray-400 font-bold uppercase tracking-widest">No Active Appointments Found</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
