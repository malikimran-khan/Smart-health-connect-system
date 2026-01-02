import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaCommentAlt, FaUserMd, FaHospital, FaHistory, FaEnvelope, FaChevronRight, FaFilter } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL;

export default function ShowDoctor() {
  const [doctors, setDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentData, setAppointmentData] = useState({
    date: '',
    time: '',
    paymentMethod: 'Cash',
  });
  const [chatEligibleDoctors, setChatEligibleDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const patientId = localStorage.getItem('patientId');

  useEffect(() => {
    const fetchDoctors = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${API_URL}/api/doctor/all-doctor`);
        setDoctors(res.data);

        const eligible = [];
        for (const doc of res.data) {
          try {
            const response = await axios.get(
              `${API_URL}/api/appointment/hasAppointment/${patientId}/${doc._id}`
            );
            if (response.data.hasAppointment) {
              eligible.push(doc._id);
            }
          } catch (e) {
            console.error("Error checking eligibility", e);
          }
        }
        setChatEligibleDoctors(eligible);
      } catch (error) {
        console.error("Error fetching doctors or checking appointments", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (token && patientId) {
      fetchDoctors();
    } else {
      navigate('/login');
    }
  }, [token, patientId, navigate]);

  const handleBookNow = (doctor) => {
    if (!token) {
      navigate('/login');
    } else {
      setSelectedDoctor(doctor);
      setShowModal(true);
    }
  };

  const handleAppointmentChange = (e) => {
    setAppointmentData({ ...appointmentData, [e.target.name]: e.target.value });
  };

  const handleConfirmAppointment = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const patientRes = await axios.get(`${API_URL}/api/patients/${patientId}`, config);
      const patient = patientRes.data;

      await axios.post(
        `${API_URL}/api/appointment/book`,
        {
          doctorId: selectedDoctor._id,
          doctorName: selectedDoctor.firstName + " " + selectedDoctor.lastName,
          patientId,
          patientName: patient.firstName + " " + patient.lastName,
          patientEmail: patient.email,
          appointmentDate: appointmentData.date,
          appointmentTime: appointmentData.time,
          paymentMethod: appointmentData.paymentMethod,
        },
        config
      );

      alert('Appointment booked successfully!');
      setShowModal(false);
      window.location.reload();
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Failed to book appointment.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#00072d] flex items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="w-16 h-16 border-4 border-[#0a2472] border-t-[#5eaf73] rounded-full animate-spin mx-auto" />
          <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Locating Specialists...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#00072d] pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-4">
            <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
              <span className="text-xs font-black uppercase tracking-widest text-[#5eaf73]">Medical Directory</span>
            </div>
            <h1 className="text-5xl font-black text-white tracking-tight">
              Elite <span className="text-gradient">Medical Experts</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-xl">
              Connect with world-class specialists verified for excellence and patient outcomes.
            </p>
          </div>

          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-white font-bold hover:bg-white/10 transition-all">
              <FaFilter size={14} className="text-[#0a2472]" />
              Filters
            </button>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doc, idx) => (
            <motion.div
              key={doc._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative bg-white/5 border border-white/10 rounded-[3rem] p-8 backdrop-blur-xl overflow-hidden shadow-2xl transition-all"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#0a2472]/10 rounded-full blur-3xl group-hover:bg-[#0a2472]/20 transition-all" />

              {/* Profile Section */}
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="w-28 h-28 rounded-[2.5rem] overflow-hidden border-4 border-white/10 p-1 group-hover:border-[#0a2472]/40 transition-all">
                    <img
                      src={`${API_URL}/uploads/doctors/${doc.profileImage}`}
                      alt={doc.firstName}
                      className="w-full h-full object-cover rounded-[2rem]"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#5eaf73] rounded-2xl flex items-center justify-center border-4 border-[#00072d] shadow-lg">
                    <FaUserMd className="text-white text-sm" />
                  </div>
                </div>

                <h3 className="text-2xl font-black text-white mb-1">Dr. {doc.firstName} {doc.lastName}</h3>
                <p className="text-[#5eaf73] font-black uppercase tracking-widest text-[10px] mb-6">
                  {doc.specialty} Specialist
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 w-full mb-8">
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                    <FaHistory className="text-[#0a2472] mb-2 mx-auto" />
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Exp.</p>
                    <p className="text-white font-black">{doc.yearsOfExperience}y</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                    <FaHospital className="text-[#0a2472] mb-2 mx-auto" />
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Hospital</p>
                    <p className="text-white font-black truncate text-[10px]">{doc.hospitalAffiliation || 'General'}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4 w-full">
                  <button
                    onClick={() => handleBookNow(doc)}
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-[#0a2472] to-[#123499] text-white rounded-[2rem] font-bold shadow-xl shadow-[#0a2472]/20 hover:shadow-[#0a2472]/40 transition-all"
                  >
                    <FaCalendarAlt />
                    Book Visit
                    <FaChevronRight className="ml-auto text-xs opacity-50" />
                  </button>

                  {chatEligibleDoctors.includes(doc._id) && (
                    <button
                      onClick={() => navigate(`/patient-chat/${doc._id}`)}
                      className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white/5 border border-white/10 text-white rounded-[2rem] font-bold hover:bg-white/10 transition-all"
                    >
                      <FaCommentAlt className="text-[#5eaf73]" />
                      Direct Message
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal Redesign */}
        <AnimatePresence>
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center z-[1000] p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowModal(false)}
                className="absolute inset-0 bg-[#00072d]/90 backdrop-blur-md"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-[#051650] border border-white/10 p-10 rounded-[3rem] w-full max-w-xl shadow-4xl overflow-hidden"
              >
                {/* Decorative background for modal */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#0a2472]/20 rounded-full blur-[80px] -mr-32 -mt-32" />

                <div className="relative z-10">
                  <div className="flex items-center gap-6 mb-10 pb-6 border-b border-white/10">
                    <img
                      src={`${API_URL}/uploads/doctors/${selectedDoctor?.profileImage}`}
                      className="w-20 h-20 rounded-3xl object-cover border-2 border-white/10"
                    />
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#5eaf73] mb-1">Scheduling with</p>
                      <h3 className="text-3xl font-black text-white">Dr. {selectedDoctor?.firstName}</h3>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Preferred Date</label>
                        <input
                          type="date"
                          name="date"
                          value={appointmentData.date}
                          onChange={handleAppointmentChange}
                          className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-[#0a2472] transition-all"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Preferred Time</label>
                        <input
                          type="time"
                          name="time"
                          value={appointmentData.time}
                          onChange={handleAppointmentChange}
                          className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-[#0a2472] transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Payment Method</label>
                      <div className="grid grid-cols-2 gap-4">
                        {['Cash', 'Online'].map(method => (
                          <button
                            key={method}
                            onClick={() => setAppointmentData({ ...appointmentData, paymentMethod: method })}
                            className={`px-6 py-4 rounded-2xl font-bold border transition-all ${appointmentData.paymentMethod === method
                                ? 'bg-[#0a2472] border-[#0a2472] text-white shadow-xl'
                                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                              }`}
                          >
                            {method}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4 pt-10">
                      <button
                        onClick={() => setShowModal(false)}
                        className="flex-1 py-5 bg-white/5 text-gray-400 font-bold rounded-3xl hover:bg-white/10 transition-all border border-white/5"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleConfirmAppointment}
                        className="flex-[2] py-5 bg-gradient-to-r from-[#0a2472] to-[#123499] text-white font-black rounded-3xl shadow-2xl transition-all hover:-translate-y-1 active:scale-95"
                      >
                        Confirm Appointment
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
