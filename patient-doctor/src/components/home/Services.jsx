import React from 'react';
import { motion } from 'framer-motion';
import { FaHeartbeat, FaCalendarCheck, FaUserMd, FaClinicMedical, FaQuoteLeft } from 'react-icons/fa';
import herobanner from '../../assets/Hero_Banner.png';
import doctor2 from '../../assets/doctor2.jpg';

const Services = () => {
  const healthTips = [
    {
      icon: <FaHeartbeat />,
      iconBg: "bg-red-500/10 text-red-500",
      title: "Preventive Care",
      description: "Next-gen diagnostics and regular health tracking to detect issues early."
    },
    {
      icon: <FaCalendarCheck />,
      iconBg: "bg-blue-500/10 text-blue-500",
      title: "Smart Scheduling",
      description: "Frictionless 24/7 booking system synchronized with your lifestyle."
    },
    {
      icon: <FaUserMd />,
      iconBg: "bg-[#5eaf73]/10 text-[#5eaf73]",
      title: "Vetted Experts",
      description: "Connect with elite board-certified physicians and global specialists."
    },
    {
      icon: <FaClinicMedical />,
      iconBg: "bg-purple-500/10 text-purple-500",
      title: "Digital Ecosystem",
      description: "State-of-the-art virtual care facilities for precise remote mapping."
    }
  ];

  return (
    <section className="bg-[#00072d] py-24 relative overflow-hidden">
      {/* Decorative Gradient */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-[#0a2472]/10 rounded-full blur-[150px] -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">

          {/* Left Content - Services Grid */}
          <div className="lg:w-1/2 space-y-12 order-2 lg:order-1">
            <div className="space-y-4">
              <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
                <span className="text-xs font-black uppercase tracking-widest text-gray-500">Service Architecture</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                Modern Healthcare <br />
                <span className="text-gradient">Infrastructure</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {healthTips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-white/5 p-8 rounded-[2.5rem] border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 transition-transform group-hover:scale-110 group-hover:rotate-6 ${tip.iconBg}`}>
                    {tip.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{tip.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-medium">{tip.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Premium Quote Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-r from-[#0a2472] to-[#123499] rounded-[2.5rem] p-8 overflow-hidden shadow-2xl"
            >
              <FaQuoteLeft className="absolute -top-4 -left-4 text-white/5 text-9xl" />
              <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                <div className="relative">
                  <img
                    src={doctor2}
                    alt="CMO"
                    className="w-24 h-24 rounded-3xl object-cover border-4 border-white/20 shadow-2xl"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#5eaf73] rounded-xl flex items-center justify-center border-4 border-[#0a2472]">
                    <FaClinicMedical className="text-white text-[10px]" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <p className="text-lg font-bold text-white leading-relaxed mb-4 italic">
                    "Precision medicine is the frontier of longevity. We don't just treat patients; we map their future health."
                  </p>
                  <p className="text-[#5eaf73] font-black uppercase tracking-widest text-xs">
                    Dr. Sarah Johnson • Chief Medical Officer
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Visual Banner */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/2 order-1 lg:order-2"
          >
            <div className="relative group p-4 bg-white/5 rounded-[3.5rem] border border-white/10 shadow-3xl backdrop-blur-sm">
              <div className="relative rounded-[3rem] overflow-hidden">
                <img
                  src={herobanner}
                  alt="Clinical Excellence"
                  className="w-full h-auto object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                />
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#00072d]/80 via-transparent to-transparent" />

                {/* Floating Metric */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="absolute bottom-8 right-8 bg-[#5eaf73] p-6 rounded-[2.5rem] shadow-2xl border-4 border-[#00072d] min-w-[160px]"
                >
                  <p className="text-4xl font-black text-[#00072d] text-center mb-1">10K+</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#00072d]/60 text-center">Global Patients</p>
                </motion.div>
              </div>

              {/* Decorative Lines */}
              <div className="absolute -top-6 -right-6 w-24 h-24 border-t-4 border-r-4 border-[#0a2472] rounded-tr-[3rem] opacity-40 group-hover:scale-110 transition-transform" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 border-b-4 border-l-4 border-[#5eaf73] rounded-bl-[3rem] opacity-40 group-hover:scale-110 transition-transform" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Services;
