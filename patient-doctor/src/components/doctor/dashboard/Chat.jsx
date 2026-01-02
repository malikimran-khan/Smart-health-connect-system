import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaUserCircle, FaPaperPlane, FaPaperclip, FaChevronLeft, FaCircle, FaUserMd } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL;
const socket = io(API_URL);

export default function DoctorChat() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);
  const doctorId = localStorage.getItem('doctor-id');

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  useEffect(() => {
    if (doctorId) {
      socket.emit('joinRoom', { userId: doctorId });
    }
  }, [doctorId]);

  useEffect(() => {
    const fetchPatients = async () => {
      if (!doctorId) return;
      try {
        const res = await axios.get(`${API_URL}/api/chat/received/${doctorId}`);
        const uniqueIds = [...new Set(res.data.map(msg => msg.senderId))];

        const details = await Promise.all(
          uniqueIds.map(async (id) => {
            try {
              const { data } = await axios.get(`${API_URL}/api/patients/patients/${id}`);
              return {
                patientId: id,
                patientName: data.patientName || 'Unnamed',
                profileImage: data.profileImage ? `${API_URL}/uploads/patients/${data.profileImage}` : null,
                lastMessage: res.data.find(msg => msg.senderId === id)?.message || '',
                lastMessageTime: res.data.find(msg => msg.senderId === id)?.createdAt || ''
              };
            } catch {
              return { patientId: id, patientName: 'Patient User', profileImage: null };
            }
          })
        );
        setPatients(details);
      } catch (err) {
        console.error('Error:', err);
      }
    };
    fetchPatients();
  }, [doctorId]);

  useEffect(() => {
    if (selectedPatient) {
      axios.get(`${API_URL}/api/chat/conversation/${doctorId}/${selectedPatient.patientId}`)
        .then(res => setMessages(res.data))
        .catch(err => console.error(err));
    }
  }, [selectedPatient, doctorId]);

  useEffect(() => {
    socket.on('receiveMessage', (data) => {
      if (selectedPatient?.patientId === data.senderId) {
        setMessages(prev => [...prev, data]);
      }
    });
    return () => socket.off('receiveMessage');
  }, [selectedPatient]);

  const sendMessage = () => {
    if (!input.trim() || !selectedPatient) return;
    const newMessage = {
      senderId: doctorId,
      senderModel: 'Doctor',
      receiverId: selectedPatient.patientId,
      receiverModel: 'Patient',
      message: input.trim(),
    };

    axios.post(`${API_URL}/api/chat/send`, newMessage)
      .then(res => {
        setMessages(prev => [...prev, res.data]);
        socket.emit('sendMessage', res.data);
        setInput('');
      })
      .catch(err => console.error(err));
  };

  const filteredPatients = patients.filter(p => p.patientName.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="h-[calc(100vh-160px)] bg-[#051650]/40 rounded-[3rem] border border-white/5 flex overflow-hidden backdrop-blur-3xl shadow-4xl relative">
      {/* Sidebar */}
      <motion.div
        animate={{ width: showSidebar ? '380px' : '0px', opacity: showSidebar ? 1 : 0 }}
        className="bg-[#051650]/60 border-r border-white/5 flex flex-col h-full overflow-hidden"
      >
        <div className="p-10 border-b border-white/5">
          <h2 className="text-3xl font-black text-white mb-6 tracking-tight">Messages</h2>
          <div className="relative">
            <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0a2472] transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
          {filteredPatients.map((patient, idx) => (
            <motion.div
              key={idx}
              whileHover={{ x: 5 }}
              onClick={() => setSelectedPatient(patient)}
              className={`p-6 rounded-[2rem] cursor-pointer transition-all border ${selectedPatient?.patientId === patient.patientId
                  ? 'bg-[#0a2472] border-[#0a2472]/40 shadow-2xl shadow-black/20'
                  : 'bg-white/5 border-transparent hover:border-white/10'
                }`}
            >
              <div className="flex gap-4">
                <div className="relative shrink-0">
                  <div className="w-14 h-14 bg-[#123499] rounded-2xl flex items-center justify-center overflow-hidden border-2 border-white/10 shadow-lg">
                    {patient.profileImage ? (
                      <img src={patient.profileImage} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xl font-black text-white/50">{patient.patientName.charAt(0)}</span>
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#5eaf73] border-4 border-[#051650] rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-lg font-bold text-white truncate">{patient.patientName}</h4>
                  </div>
                  <p className="text-xs text-gray-400 truncate font-medium">{patient.lastMessage || 'Open conversation'}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Main Chat */}
      <div className="flex-1 flex flex-col h-full relative">
        <AnimatePresence mode="wait">
          {selectedPatient ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col h-full"
            >
              {/* Header */}
              <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/5 backdrop-blur-md">
                <div className="flex items-center gap-6">
                  <button
                    onClick={toggleSidebar}
                    className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors border border-white/5"
                  >
                    <FaChevronLeft className={`transition-transform duration-500 ${showSidebar ? '' : 'rotate-180'}`} />
                  </button>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#0a2472] to-[#123499] rounded-2xl flex items-center justify-center shadow-xl border border-white/10">
                      <FaUserCircle size={28} className="text-white/50" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white">{selectedPatient.patientName}</h3>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#5eaf73] rounded-full animate-pulse" />
                        <span className="text-[10px] text-[#5eaf73] font-black uppercase tracking-widest">Encypted Session</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.senderModel === 'Doctor' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[60%] p-6 rounded-[2rem] text-sm font-medium leading-relaxed shadow-2xl ${msg.senderModel === 'Doctor'
                        ? 'bg-[#0a2472] text-white rounded-tr-none border border-white/10'
                        : 'bg-white/5 text-gray-200 rounded-tl-none border border-white/5'
                      }`}>
                      {msg.message}
                      <span className="block text-[8px] opacity-40 mt-3 text-right font-black uppercase tracking-widest">
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Input */}
              <div className="p-10 bg-white/5 border-t border-white/5">
                <div className="flex gap-4">
                  <div className="flex-1 relative group">
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Consultation details..."
                      className="w-full bg-white/5 border border-white/5 rounded-3xl px-8 py-5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0a2472] transition-all group-hover:bg-white/10"
                    />
                    <FaPaperclip className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white cursor-pointer" />
                  </div>
                  <button
                    onClick={sendMessage}
                    className="w-16 h-16 bg-[#5eaf73] rounded-3xl flex items-center justify-center text-[#00072d] shadow-2xl hover:-translate-y-1 hover:shadow-[#5eaf73]/20 active:scale-95 transition-all"
                  >
                    <FaPaperPlane size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-20 text-center">
              <div className="w-32 h-32 bg-white/5 rounded-[3rem] flex items-center justify-center mb-10 border border-white/5 shadow-inner">
                <FaUserMd className="text-5xl text-[#0a2472]/40" />
              </div>
              <h3 className="text-4xl font-black text-white mb-4 italic">Secure Terminal</h3>
              <p className="text-gray-500 max-w-sm font-bold text-lg leading-relaxed">Select a patient profile to begin an end-to-end encrypted medical consultation.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
