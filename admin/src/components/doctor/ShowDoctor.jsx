import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUserMd, FaHospital, FaEnvelope, FaPhone, FaFileAlt, FaIdCard, FaGraduationCap, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function ShowDoctor() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/doctor/all-doctor");
        setDoctors(res.data);
      } catch (error) {
        console.error("Error fetching doctors", error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <h2 className="text-4xl font-black text-[#00072d] tracking-tight mb-2">Doctor Directory</h2>
          <p className="text-gray-400 font-medium">Manage and verify medical professionals in your network.</p>
        </div>
        <div className="glass-card px-8 py-5 rounded-[2rem] flex items-center gap-4 border-l-4 border-[#123499]">
          <div className="text-right">
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Active Personnel</p>
            <p className="text-2xl font-black text-[#00072d] leading-none">{doctors.length}</p>
          </div>
          <div className="w-12 h-12 bg-[#123499]/10 text-[#123499] rounded-2xl flex items-center justify-center shadow-inner">
            <FaUserMd size={20} />
          </div>
        </div>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {doctors.map((doc, index) => (
          <motion.div
            key={doc._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="glass-card rounded-[2.5rem] overflow-hidden group hover:shadow-2xl hover:shadow-[#0a2472]/10 transition-all duration-500"
          >
            {/* Header / Image Section */}
            <div className="h-32 bg-gradient-to-r from-[#051650] to-[#123499] relative">
              <div className="absolute -bottom-12 left-8">
                <div className="relative">
                  <img
                    src={`http://localhost:8000/uploads/doctors/${doc.profileImage}`}
                    alt={`${doc.firstName} ${doc.lastName}`}
                    className="w-28 h-28 object-cover rounded-[2rem] border-4 border-white shadow-xl"
                  />
                  <div className="absolute -right-2 -bottom-2 bg-[#5eaf73] text-white w-8 h-8 rounded-xl flex items-center justify-center border-4 border-white shadow-lg">
                    <FaUserMd size={12} />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-16 p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-black text-[#00072d] mb-1 group-hover:text-[#123499] transition-colors leading-tight">
                  Dr. {doc.firstName} {doc.lastName}
                </h3>
                <p className="text-[#5eaf73] font-black text-[10px] uppercase tracking-[0.2em]">{doc.specialty}</p>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  { icon: FaHospital, label: 'Affiliation', value: doc.hospitalAffiliation },
                  { icon: FaUserMd, label: 'Experience', value: `${doc.yearsOfExperience} Years` },
                  { icon: FaEnvelope, label: 'Email Address', value: doc.email },
                  { icon: FaPhone, label: 'Contact Number', value: doc.phone },
                  { icon: FaIdCard, label: 'License ID', value: doc.licenseNumber },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 group/item">
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover/item:bg-[#123499]/10 group-hover/item:text-[#123499] transition-all">
                      <item.icon size={14} />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{item.label}</p>
                      <p className="text-sm font-bold text-[#051650] truncate max-w-[180px]">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                <div className="flex -space-x-2">
                  <div className="w-9 h-9 rounded-xl bg-[#f1f5f9] flex items-center justify-center text-[#123499]" title="Degree">
                    <FaGraduationCap size={14} />
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-[#f1f5f9] flex items-center justify-center text-[#5eaf73]" title="License">
                    <FaFileAlt size={14} />
                  </div>
                </div>
                <motion.button
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 text-xs font-black text-[#123499] uppercase tracking-widest"
                >
                  View Profile <FaChevronRight size={10} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
