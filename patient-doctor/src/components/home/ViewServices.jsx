import React from 'react';
import { FaUserMd, FaFileMedical, FaAmbulance, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ViewServices = () => {
  const services = [
    {
      id: 1,
      title: "Doctor Appointments",
      description: "Book in-person consultations with specialists across 50+ specialties. Flexible scheduling with instant confirmation.",
      icon: <FaUserMd />,
      color: "from-[#0a2472] to-[#123499]",
      action: "Find Doctors",
      link: "/show-doctor"
    },
    {
      id: 4,
      title: "Medical Reports",
      description: "Secure digital access to all your health records. Share with doctors instantly via encrypted links.",
      icon: <FaFileMedical />,
      color: "from-[#051650] to-[#0a2472]",
      action: "Access Portal",
      link: "/dashboard/home"
    },
    {
      id: 5,
      title: "Emergency Care",
      description: "24/7 emergency response with average 12-minute response time. GPS-enabled ambulance dispatch.",
      icon: <FaAmbulance />,
      color: "from-[#00072d] to-[#051650]",
      action: "Emergency Help",
      link: "/contact"
    },
    {
      id: 6,
      title: "Health Packages",
      description: "Customizable checkup packages with AI-powered recommendations based on your health profile.",
      icon: <FaCalendarAlt />,
      color: "from-[#0a2472] to-[#5eaf73]/20",
      action: "View Packages",
      link: "/viewservices"
    }
  ];

  return (
    <div className="min-h-screen bg-[#00072d] pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-24 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 bg-white/5 border border-[#0a2472]/30 rounded-full mb-4"
          >
            <span className="text-xs font-black uppercase tracking-widest text-[#5eaf73]">Health Eco-System</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight"
          >
            Direct <span className="text-gradient">Healthcare Access</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto font-medium"
          >
            Unified pathways to specialized care. We've simplified medical logistics so you can focus on recovery.
          </motion.p>
        </div>

        {/* Services List */}
        <div className="grid gap-12 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-[3rem] border border-white/5 bg-white/5 backdrop-blur-xl hover:border-white/10 transition-all duration-500 shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none" />

              <div className="p-10 md:p-14 relative z-10">
                <div className="flex flex-col md:flex-row md:items-center gap-10 lg:gap-16">
                  <div className="flex-shrink-0">
                    <div className={`w-24 h-24 rounded-[2rem] bg-gradient-to-br ${service.color} flex items-center justify-center text-white text-4xl shadow-2xl transition-transform duration-500 group-hover:scale-110 shadow-[#0a2472]/20`}>
                      {service.icon}
                    </div>
                  </div>

                  <div className="flex-grow space-y-4">
                    <h2 className="text-3xl font-black text-white tracking-tight">{service.title}</h2>
                    <p className="text-gray-400 text-lg leading-relaxed font-medium">
                      {service.description}
                    </p>
                    <div className="pt-4">
                      <Link
                        to={service.link}
                        className="inline-flex items-center gap-4 px-8 py-4 bg-white/5 rounded-2xl text-white font-black text-xs uppercase tracking-widest border border-white/5 hover:bg-[#0a2472] hover:border-[#0a2472] transition-all transform hover:-translate-y-1 active:scale-95"
                      >
                        {service.action}
                        <FaArrowRight size={10} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Support CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative mt-32 p-16 rounded-[4rem] bg-gradient-to-br from-[#0a2472] to-[#123499] overflow-hidden text-center shadow-4xl group"
        >
          {/* Decorative Orbs */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-1000" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-black/20 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h3 className="text-4xl font-black text-white tracking-tighter">Specialized Inquiry?</h3>
            <p className="text-white/80 text-xl font-medium leading-relaxed">
              Our medical concierge team is available 24/7 to coordinate complex healthcare requirements or emergency dispatches.
            </p>
            <div className="flex justify-center pt-4">
              <Link
                to="/contact"
                className="px-12 py-5 bg-[#5eaf73] text-[#00072d] rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all shadow-black/20"
              >
                Immediate Support
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ViewServices;
