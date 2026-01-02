import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCalendarAlt, FaUser, FaEnvelope, FaClock, FaMoneyBillWave, FaChevronRight, FaFilter } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL;

export default function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const doctorId = localStorage.getItem('doctor-id');
        const token = localStorage.getItem('doctorToken');

        if (!doctorId || !token) {
          console.error('Doctor not authenticated');
          return;
        }

        const res = await axios.get(
          `${API_URL}/api/appointment/doctor/${doctorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAppointments(res.data);
      } catch (err) {
        console.error('Error fetching appointments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="space-y-4">
          <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
            <span className="text-xs font-black uppercase tracking-widest text-[#5eaf73]">Schedule Management</span>
          </div>
          <h2 className="text-4xl font-black text-white tracking-tight flex items-center">
            My <span className="text-gradient ml-3">Appointments</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl">
            Overview of your upcoming patient consultations and surgical schedules.
          </p>
        </div>

        <div className="flex gap-4">
          <div className="px-6 py-3 bg-[#0a2472]/10 border border-[#0a2472]/20 rounded-2xl">
            <span className="text-white font-black text-xl">{appointments.length}</span>
            <span className="text-gray-500 font-bold text-xs uppercase tracking-widest ml-3">Total Events</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-96 space-y-6">
          <div className="w-12 h-12 border-4 border-[#0a2472] border-t-[#5eaf73] rounded-full animate-spin" />
          <p className="text-gray-500 font-black uppercase tracking-widest text-xs">Synchronizing Calendar...</p>
        </div>
      ) : appointments.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 border border-white/5 rounded-[3rem] p-20 text-center backdrop-blur-xl"
        >
          <div className="w-24 h-24 bg-[#0a2472]/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8">
            <FaCalendarAlt size={40} className="text-[#0a2472]" />
          </div>
          <h3 className="text-2xl font-black text-white mb-4">Clear Horizon</h3>
          <p className="text-gray-500 max-w-sm mx-auto font-medium">No appointments scheduled for this period. Take this time to update your patient records.</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden backdrop-blur-xl shadow-2xl"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 bg-white/5">
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#5eaf73]">
                    <div className="flex items-center gap-3">
                      <FaUser size={10} /> Patient
                    </div>
                  </th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                    <div className="flex items-center gap-3">
                      <FaEnvelope size={10} /> contact
                    </div>
                  </th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                    <div className="flex items-center gap-3">
                      <FaCalendarAlt size={10} /> Date
                    </div>
                  </th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                    <div className="flex items-center gap-3">
                      <FaClock size={10} /> Time
                    </div>
                  </th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                    <div className="flex items-center gap-3">
                      <FaMoneyBillWave size={10} /> Method
                    </div>
                  </th>
                  <th className="px-10 py-6"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {appointments.map((appt, index) => (
                  <motion.tr
                    key={appt._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-white/5 transition-colors group cursor-pointer"
                  >
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#0a2472] rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg">
                          {appt.patientName.charAt(0)}
                        </div>
                        <div className="text-lg font-bold text-white tracking-tight">{appt.patientName}</div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="text-gray-400 font-medium">{appt.patientEmail}</div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/5 inline-block text-white font-bold">
                        {appt.appointmentDate}
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-3 text-white font-black">
                        <span className="w-2 h-2 rounded-full bg-[#5eaf73]" />
                        {appt.appointmentTime}
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${appt.paymentMethod === 'Online'
                          ? 'bg-[#5eaf73]/10 text-[#5eaf73] border-[#5eaf73]/20'
                          : 'bg-[#0a2472]/10 text-[#0a2472] border-[#0a2472]/20'
                        }`}>
                        {appt.paymentMethod}
                      </span>
                    </td>
                    <td className="px-10 py-8">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-white group-hover:bg-[#0a2472] transition-all">
                        <FaChevronRight size={12} />
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
}
