import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Cell
} from 'recharts';
import { motion } from 'framer-motion';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-gray-100 flex flex-col gap-1">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</p>
        <p className="text-lg font-black text-[#00072d]">{payload[0].value.toLocaleString()}</p>
        <p className="text-[10px] text-[#5eaf73] font-bold">↑ 8% from last month</p>
      </div>
    );
  }
  return null;
};

export default function GraphCount() {
  const [data, setData] = useState([
    { name: 'Patients', value: 0, color: '#123499' },
    { name: 'Doctors', value: 0, color: '#0a2472' },
    { name: 'Appointments', value: 0, color: '#5eaf73' }
  ]);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [patientsRes, doctorsRes, appointmentsRes] = await Promise.all([
          axios.get('http://localhost:8000/api/patients/all'),
          axios.get('http://localhost:8000/api/doctor/all-doctor'),
          axios.get('http://localhost:8000/api/appointment/all')
        ]);

        setData([
          { name: 'Patients', value: patientsRes.data?.length || 0, color: '#123499' },
          { name: 'Doctors', value: doctorsRes.data?.length || 0, color: '#0a2472' },
          { name: 'Appointments', value: appointmentsRes.data?.length || 0, color: '#5eaf73' }
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="w-full mb-10"
    >
      <div className="glass-card rounded-[2.5rem] p-8 md:p-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h4 className="text-2xl font-black text-[#00072d] tracking-tight">System Statistics</h4>
            <p className="text-gray-400 text-sm font-medium">Real-time overview of hospital data distribution.</p>
          </div>
          <div className="flex items-center gap-3">
            <select className="bg-gray-50 border-none rounded-xl px-4 py-2 text-xs font-bold text-gray-500 outline-none focus:ring-2 focus:ring-[#123499]/10">
              <option>Yearly Summary</option>
              <option>Monthly View</option>
            </select>
          </div>
        </div>

        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barSize={60} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <defs>
                {data.map((entry, index) => (
                  <linearGradient key={`grad-${index}`} id={`barGrad-${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={entry.color} stopOpacity={1} />
                    <stop offset="100%" stopColor={entry.color} stopOpacity={0.6} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                dy={15}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
              <Bar dataKey="value" radius={[15, 15, 15, 15]} animationDuration={2000} animationEasing="ease-out">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`url(#barGrad-${index})`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
