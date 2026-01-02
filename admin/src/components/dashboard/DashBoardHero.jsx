import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserInjured, FaUserMd, FaCalendarAlt, FaArrowUp } from 'react-icons/fa';

// Animated Number Component
const AnimatedNumber = ({ value, duration = 1500, prefix = '', suffix = '' }) => {
  const [currentValue, setCurrentValue] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (!inView) return;

    const targetValue = parseFloat(value) || 0;
    let startTimestamp = null;

    const animate = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = timestamp - startTimestamp;
      const percentage = Math.min(progress / duration, 1);
      const eased = 1 - Math.pow(1 - percentage, 3); // Cubic ease out
      const newValue = eased * targetValue;

      setCurrentValue(suffix === '%' ? newValue.toFixed(1) : Math.round(newValue));

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setCurrentValue(targetValue);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, value, duration, suffix]);

  return (
    <span ref={ref}>
      {prefix}
      {Number(currentValue).toLocaleString()}
      {suffix}
    </span>
  );
};

const Card = ({ title, value, description, icon: Icon, color, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="w-full md:w-1/3 p-4"
    >
      <div className="glass-card rounded-[2rem] p-8 relative overflow-hidden group hover:shadow-2xl hover:shadow-[#0a2472]/10 transition-all duration-500">
        {/* Decorative Background Blob */}
        <div
          className="absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500"
          style={{ backgroundColor: color }}
        ></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 duration-500"
              style={{ backgroundColor: `${color}15`, color: color }}
            >
              <Icon size={24} />
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#5eaf73]/10 text-[#5eaf73] rounded-full text-[10px] font-bold uppercase tracking-wider">
              <FaArrowUp size={10} />
              <span>12.5%</span>
            </div>
          </div>

          <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-2">{title}</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-4xl font-black text-[#00072d] mb-2 tracking-tight">
              <AnimatedNumber value={value} />
            </h2>
          </div>
          <p className="text-gray-400 text-xs font-medium leading-relaxed">{description}</p>
        </div>

        {/* Bottom Accent Line */}
        <div
          className="absolute bottom-0 left-0 h-1.5 w-0 group-hover:w-full transition-all duration-700"
          style={{ backgroundColor: color }}
        ></div>
      </div>
    </motion.div>
  );
};

export default function DashBoardHero() {
  const [stats, setStats] = useState({
    patients: 0,
    doctors: 0,
    appointments: 0
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [patientsRes, doctorsRes, appointmentsRes] = await Promise.all([
          axios.get('http://localhost:8000/api/patients/all'),
          axios.get('http://localhost:8000/api/doctor/all-doctor'),
          axios.get('http://localhost:8000/api/appointment/all'),
        ]);

        setStats({
          patients: patientsRes.data?.length || 0,
          doctors: doctorsRes.data?.length || 0,
          appointments: appointmentsRes.data?.length || 0
        });
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="mb-10">
      <div className="flex flex-wrap -mx-4">
        <Card
          title="Total Patients"
          value={stats.patients}
          description="A comprehensive record of all uniquely registered patients in your system."
          icon={FaUserInjured}
          color="#123499"
          delay={0.1}
        />
        <Card
          title="Active Doctors"
          value={stats.doctors}
          description="Highly qualified medical professionals currently serving your facility."
          icon={FaUserMd}
          color="#0a2472"
          delay={0.2}
        />
        <Card
          title="Appointments"
          value={stats.appointments}
          description="Total medical consultations scheduled and managed through the portal."
          icon={FaCalendarAlt}
          color="#5eaf73"
          delay={0.3}
        />
      </div>
    </div>
  );
}
