import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaUserMd, FaChevronLeft, FaShieldAlt, FaEllipsisV } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL;
const socket = io(API_URL);

export default function PatientChat() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const patientId = localStorage.getItem('patientId');

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (patientId) {
      socket.emit('joinRoom', { userId: patientId });
    }
  }, [patientId]);

  useEffect(() => {
    if (patientId && doctorId) {
      axios
        .get(`${API_URL}/api/chat/conversation/${patientId}/${doctorId}`)
        .then((res) => setMessages(res.data))
        .catch(console.error);
    }
  }, [patientId, doctorId]);

  useEffect(() => {
    socket.on('receiveMessage', (data) => {
      if (data.senderId === doctorId) {
        setMessages((prev) => [...prev, data]);
      }
    });
    return () => socket.off('receiveMessage');
  }, [doctorId]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const msgData = {
      senderId: patientId,
      senderModel: 'Patient',
      receiverId: doctorId,
      receiverModel: 'Doctor',
      message: input,
    };

    axios
      .post(`${API_URL}/api/chat/send`, msgData)
      .then((res) => {
        setMessages([...messages, res.data]);
        socket.emit('sendMessage', res.data);
        setInput('');
      })
      .catch(console.error);
  };

  return (
    <div className="min-h-screen bg-[#00072d] pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#051650]/40 backdrop-blur-3xl border border-white/5 rounded-[3rem] shadow-4xl overflow-hidden flex flex-col h-[750px] relative"
        >
          {/* Header */}
          <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/5">
            <div className="flex items-center gap-6">
              <button
                onClick={() => navigate(-1)}
                className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors border border-white/5"
              >
                <FaChevronLeft />
              </button>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#0a2472] to-[#123499] rounded-2xl flex items-center justify-center shadow-xl border border-white/10">
                  <FaUserMd size={24} className="text-[#5eaf73]" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-white tracking-tight">Clinical Consultation</h2>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#5eaf73] rounded-full animate-pulse" />
                    <span className="text-[10px] text-[#5eaf73] font-black uppercase tracking-widest leading-none">Encrypted Link Active</span>
                  </div>
                </div>
              </div>
            </div>
            <button className="text-gray-500 hover:text-white transition-colors">
              <FaEllipsisV />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar bg-[#00072d]/20">
            <div className="flex justify-center mb-10">
              <div className="px-4 py-2 bg-white/5 rounded-full border border-white/5 flex items-center gap-2">
                <FaShieldAlt className="text-[#0a2472] text-[10px]" />
                <span className="text-[8px] font-black text-gray-500 uppercase tracking-[0.2em]">End-to-End Encrypted Session</span>
              </div>
            </div>

            {messages.map((msg, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={idx}
                className={`flex ${msg.senderModel === 'Patient' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] p-6 rounded-[2rem] text-sm font-medium leading-relaxed shadow-2xl ${msg.senderModel === 'Patient'
                      ? 'bg-[#0a2472] text-white rounded-tr-none border border-white/10'
                      : 'bg-white/5 text-gray-200 rounded-tl-none border border-white/5'
                    }`}
                >
                  {msg.message}
                  <div className="text-[8px] font-black uppercase tracking-widest opacity-40 mt-3 text-right">
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-10 border-t border-white/5 bg-white/5">
            <div className="relative flex gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Describe your health status..."
                className="flex-1 bg-white/5 border border-white/5 rounded-[2rem] px-8 py-5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0a2472] transition-all"
              />
              <button
                onClick={sendMessage}
                className="w-16 h-16 bg-[#5eaf73] rounded-[2rem] flex items-center justify-center text-[#00072d] shadow-2xl hover:scale-105 active:scale-95 transition-all"
              >
                <FaPaperPlane size={18} />
              </button>
            </div>
            <p className="text-center mt-6 text-[8px] font-black text-gray-600 uppercase tracking-widest">Responses are monitored for quality assurance</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
