import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaUserCircle, FaEnvelope, FaPhone, FaGlobe, FaChevronRight } from 'react-icons/fa';

export default function ShowPatient() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/patients/all");
        setPatients(res.data);
      } catch (error) {
        console.error("Error fetching patients", error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <h2 className="text-4xl font-black text-[#00072d] tracking-tight mb-2">Patient Records</h2>
          <p className="text-gray-400 font-medium">Complete overview of all registered patients in the system.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass-card px-6 py-3 rounded-2xl flex items-center gap-3 border shadow-sm">
            <div className="w-8 h-8 bg-[#5eaf73]/10 text-[#5eaf73] rounded-lg flex items-center justify-center">
              <FaGlobe size={14} />
            </div>
            <span className="text-xs font-black text-[#00072d] uppercase tracking-widest">Global Access</span>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {patients.map((patient, index) => (
          <motion.div
            key={patient._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ y: -10 }}
            className="glass-card rounded-[2.5rem] overflow-hidden group border border-white hover:shadow-2xl hover:shadow-[#0a2472]/10 transition-all duration-500"
          >
            <div className="relative h-40">
              <img
                src={`http://localhost:8000/uploads/${patient.profileImage}`}
                alt={patient.firstName}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00072d]/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-6">
                <h5 className="text-xl font-black text-white leading-tight">
                  {patient.firstName} {patient.lastName}
                </h5>
                <p className="text-[#5eaf73] text-[10px] font-black uppercase tracking-widest">Verified Patient</p>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 group/info">
                <div className="w-8 h-8 bg-[#f8fafc] rounded-xl flex items-center justify-center text-gray-400 group-hover/info:text-[#123499] transition-colors">
                  <FaEnvelope size={12} />
                </div>
                <p className="text-[11px] font-bold text-gray-600 truncate">{patient.email}</p>
              </div>

              <div className="flex items-center gap-3 group/info">
                <div className="w-8 h-8 bg-[#f8fafc] rounded-xl flex items-center justify-center text-gray-400 group-hover/info:text-[#0a2472] transition-colors">
                  <FaPhone size={12} />
                </div>
                <p className="text-[11px] font-bold text-gray-600">({patient.countryCode}) {patient.phone}</p>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-full mt-4 py-3 bg-[#0a2472]/5 hover:bg-[#0a2472] hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-[#0a2472] transition-all flex items-center justify-center gap-2"
              >
                View Analytics <FaChevronRight size={10} />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
