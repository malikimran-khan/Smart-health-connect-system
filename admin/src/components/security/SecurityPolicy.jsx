import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaLock, FaSave, FaCheckCircle, FaExclamationTriangle, FaShieldAlt } from 'react-icons/fa';

export default function SecurityPolicy() {
  const [policy, setPolicy] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8000/api/security-policy')
      .then(res => {
        setPolicy(res.data?.policy || '');
      })
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!policy.trim()) return setStatus({ type: 'error', message: "Verification failed: Security field cannot be empty." });

    setLoading(true);
    try {
      await axios.post('http://localhost:8000/api/security-policy', { policy });
      setStatus({ type: 'success', message: 'Encryption protocols updated and secured.' });
      setTimeout(() => setStatus({ type: '', message: '' }), 5000);
    } catch (err) {
      setStatus({ type: 'error', message: 'Synchronization failed: Security server is unreachable.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <h2 className="text-4xl font-black text-[#00072d] tracking-tight mb-2">Security Protocol</h2>
          <p className="text-gray-400 font-medium">Configure core operational security and encryption policies.</p>
        </div>
        <div className="glass-card px-8 py-5 rounded-[2rem] flex items-center gap-4 border-l-4 border-[#0a2472]">
          <div className="text-right">
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Encryption</p>
            <p className="text-xl font-black text-[#0a2472] leading-none text-center">AES-256</p>
          </div>
          <div className="w-12 h-12 bg-[#0a2472]/10 text-[#0a2472] rounded-2xl flex items-center justify-center">
            <FaLock size={18} />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="glass-card rounded-[3rem] p-10 max-w-5xl mx-auto w-full border-t-[10px] border-[#0a2472]"
      >
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <label className="text-[10px] font-black text-[#0a2472] uppercase tracking-[0.2em]">Security Directive Content</label>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-full uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#123499] animate-pulse"></span> Protected
                </div>
              </div>
            </div>
            <textarea
              value={policy}
              onChange={(e) => setPolicy(e.target.value)}
              rows={15}
              className="w-full bg-[#f8fafc] border-2 border-transparent focus:border-[#0a2472]/20 focus:bg-white rounded-[2.5rem] p-10 outline-none text-sm font-bold text-[#051650] transition-all leading-relaxed resize-none custom-scrollbar"
              placeholder="Define high-level security directives and operational protocols..."
            />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit"
              className="w-full md:w-auto px-10 py-4 bg-[#0a2472] text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-[#0a2472]/20 hover:bg-[#00072d] transition-all flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <><FaShieldAlt size={14} /> Commit Changes</>
              )}
            </motion.button>

            {status.message && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl border ${status.type === 'success' ? 'bg-[#5eaf73]/10 border-[#5eaf73]/20 text-[#5eaf73]' : 'bg-red-50 border-red-100 text-red-500'}`}
              >
                {status.type === 'success' ? <FaCheckCircle /> : <FaExclamationTriangle />}
                <span className="text-[11px] font-black uppercase tracking-wider">{status.message}</span>
              </motion.div>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
}
