import React from 'react';
import Marquee from "react-fast-marquee";
import { motion } from 'framer-motion';
import fever from '../../assets/fever.png';
import heart from '../../assets/heart.png';
import arm from '../../assets/arm.png';
import breath from '../../assets/breath.png';
import diarrhea from '../../assets/diarrhea.png';
import fear from '../../assets/fear.png';
import migraine from '../../assets/migraine.png';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const symptoms = [
  { icon: fever, name: "Fever", color: "from-red-500/20 to-red-600/5", border: "border-red-500/20" },
  { icon: heart, name: "Heart Pain", color: "from-pink-500/20 to-pink-600/5", border: "border-pink-500/20" },
  { icon: arm, name: "Hypertension", color: "from-blue-500/20 to-blue-600/5", border: "border-blue-500/20" },
  { icon: breath, name: "Respiratory", color: "from-teal-500/20 to-teal-600/5", border: "border-teal-500/20" },
  { icon: diarrhea, name: "Digestive", color: "from-amber-500/20 to-amber-600/5", border: "border-amber-500/20" },
  { icon: fear, name: "Anxiety", color: "from-purple-500/20 to-purple-600/5", border: "border-purple-500/20" },
  { icon: migraine, name: "Neurological", color: "from-indigo-500/20 to-indigo-600/5", border: "border-indigo-500/20" }
];

const Symptom = () => {
  const navigate = useNavigate();
  const handleAppointment = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/show-doctor");
    } else {
      navigate("/patient-login");
    }
  };

  return (
    <div className="py-24 bg-[#00072d] relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#0a2472]/5 rounded-full blur-[100px] rotate-12" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-block px-4 py-1.5 bg-[#0a2472]/10 border border-[#0a2472]/20 rounded-full mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#5eaf73]">Health Diagnostics</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Common Symptoms We <span className="text-gradient">Specialize In</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Identify your concern and connect with board-certified experts trained to provide personalized care journeys.
          </p>
        </motion.div>

        <div className="relative group">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#00072d] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#00072d] to-transparent z-10" />

          <Marquee speed={40} gradient={false} pauseOnHover>
            {symptoms.map((symptom, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`mx-4 p-8 rounded-[2.5rem] bg-gradient-to-br ${symptom.color} border ${symptom.border} backdrop-blur-xl min-w-[200px] transition-all duration-300`}
              >
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-6 shadow-inner">
                    <img
                      src={symptom.icon}
                      alt={symptom.name}
                      className="w-12 h-12 object-contain filter drop-shadow-lg"
                    />
                  </div>
                  <span className="text-white font-bold tracking-tight text-center">{symptom.name}</span>
                </div>
              </motion.div>
            ))}
          </Marquee>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <button
            onClick={handleAppointment}
            className="group inline-flex items-center space-x-4 px-10 py-5 bg-white/5 border border-white/10 hover:border-[#5eaf73]/30 rounded-3xl text-white font-bold transition-all duration-300"
          >
            <span className="text-lg">View Specialist Directory</span>
            <div className="w-10 h-10 rounded-xl bg-[#5eaf73] flex items-center justify-center group-hover:translate-x-2 transition-transform shadow-lg shadow-[#5eaf73]/20">
              <FaArrowRight size={14} />
            </div>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Symptom;
