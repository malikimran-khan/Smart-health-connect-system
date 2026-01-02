import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaCommentMedical, FaPaperPlane, FaLaptopMedical } from 'react-icons/fa';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [width, setWidth] = useState(380);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Diagnostic Terminal Online. How can I assist your clinical journey today?' }
  ]);
  const isResizing = useRef(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const startResize = (e) => {
    e.preventDefault();
    isResizing.current = true;
    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', stopResize);
  };

  const handleResize = (e) => {
    if (!isResizing.current) return;
    const newWidth = window.innerWidth - e.clientX - 24;
    if (newWidth >= 320 && newWidth <= 600) {
      setWidth(newWidth);
    }
  };

  const stopResize = () => {
    isResizing.current = false;
    document.removeEventListener('mousemove', handleResize);
    document.removeEventListener('mouseup', stopResize);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: 'user', text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');

    try {
      const res = await fetch(`${API_URL}/api/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: input }),
      });
      const data = await res.json();
      setMessages([...updatedMessages, { sender: 'bot', text: data.answer }]);
    } catch (error) {
      setMessages([...updatedMessages, { sender: 'bot', text: 'Error in neural link. Please try again.' }]);
    }
  };

  return (
    <div className="fixed bottom-10 right-10 z-[999]">
      <motion.button
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-gradient-to-br from-[#0a2472] to-[#123499] text-white rounded-2xl shadow-4xl flex items-center justify-center border border-white/10 ring-4 ring-[#0a2472]/20"
      >
        {isOpen ? <FaTimes size={20} /> : <FaLaptopMedical size={24} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            drag
            dragConstraints={{ top: -600, left: -1000, right: 0, bottom: 0 }}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 bg-[#051650]/80 rounded-[2.5rem] shadow-4xl border border-white/10 backdrop-blur-2xl overflow-hidden shadow-black/40"
            style={{ width }}
          >
            {/* Header */}
            <div className="bg-[#0a2472] p-6 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#5eaf73] rounded-xl flex items-center justify-center text-[#00072d]">
                  <FaRobot size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-widest">Medical AI</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#5eaf73] rounded-full animate-pulse" />
                    <span className="text-[8px] text-[#5eaf73] font-black">ACTIVE LINK</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Body */}
            <div className="h-96 p-6 overflow-y-auto space-y-6 custom-scrollbar bg-[#00072d]/40">
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`p-4 rounded-2xl text-xs font-medium leading-relaxed max-w-[85%] ${msg.sender === 'user'
                      ? 'bg-[#0a2472] text-white rounded-tr-none border border-white/10 shadow-xl'
                      : 'bg-white/5 text-gray-200 rounded-tl-none border border-white/5'
                    }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input Footer */}
            <div className="p-6 bg-[#00072d]/60 border-t border-white/5">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Ask about symptoms..."
                  className="flex-1 bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0a2472] transition-all"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button
                  onClick={handleSend}
                  className="w-12 h-12 bg-[#5eaf73] text-[#00072d] rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg"
                >
                  <FaPaperPlane size={14} />
                </button>
              </div>
              <p className="text-[8px] text-gray-500 mt-4 text-center font-black uppercase tracking-widest opacity-50">Powered by Neural Diagnostics</p>
            </div>

            {/* Resize Handle */}
            <div
              onMouseDown={startResize}
              className="absolute left-0 top-0 w-2 h-full cursor-ew-resize hover:bg-[#0a2472]/40 transition-colors"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
