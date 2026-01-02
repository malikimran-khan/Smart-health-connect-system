import React from 'react';
import {
  FaClinicMedical, FaPhoneAlt, FaEnvelope,
  FaMapMarkerAlt, FaFacebook, FaTwitter,
  FaInstagram, FaLinkedin, FaArrowRight
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const UserFooter = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quickLinks: [
      { name: 'Home', path: '/' },
      { name: 'Find Doctor', path: '/show-doctor' },
      { name: 'Services', path: '/viewservices' },
      { name: 'About Us', path: '/about' },
      { name: 'Contact', path: '/contact' }
    ],
    services: [
      { name: 'Online Consultation', path: '#' },
      { name: 'Emergency Care', path: '#' },
      { name: 'Health Checkup', path: '#' },
      { name: 'Medicine Delivery', path: '#' },
      { name: 'Lab Tests', path: '#' }
    ]
  };

  return (
    <footer className="relative bg-[#00072d] text-white pt-24 pb-12 overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0a2472]/10 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#5eaf73]/5 rounded-full blur-[120px] -ml-64 -mb-64" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand Info */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-[#0a2472] to-[#5eaf73] rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
                <FaClinicMedical className="text-white text-2xl" />
              </div>
              <span className="text-3xl font-black tracking-tighter text-white">
                MediCare<span className="text-[#5eaf73]">+</span>
              </span>
            </Link>
            <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
              Empowering your health journey with world-class medical expertise and seamless digital care.
            </p>
            <div className="flex space-x-4">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-[#5eaf73] border border-white/10 hover:border-[#5eaf73]/30 transition-colors"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h3 className="text-xl font-bold text-white tracking-tight">Quick Links</h3>
            <ul className="space-y-4">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="group flex items-center text-gray-400 hover:text-white transition-colors">
                    <FaArrowRight className="text-[10px] mr-3 text-[#0a2472] group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-8">
            <h3 className="text-xl font-bold text-white tracking-tight">Our Services</h3>
            <ul className="space-y-4">
              {footerLinks.services.map((service) => (
                <li key={service.name}>
                  <a href={service.path} className="group flex items-center text-gray-400 hover:text-white transition-colors">
                    <FaArrowRight className="text-[10px] mr-3 text-[#5eaf73] group-hover:translate-x-1 transition-transform" />
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <h3 className="text-xl font-bold text-white tracking-tight">Contact Us</h3>
            <div className="space-y-6">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center space-x-4 mb-2 text-[#5eaf73]">
                  <FaPhoneAlt size={14} />
                  <span className="text-xs font-black uppercase tracking-widest opacity-60">Emergency line</span>
                </div>
                <p className="text-white font-bold text-lg">+1 (234) 567-8910</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4 group cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#0a2472] group-hover:bg-[#0a2472] group-hover:text-white transition-all">
                    <FaEnvelope size={16} />
                  </div>
                  <span className="text-gray-400 group-hover:text-white transition-colors">support@medicare.com</span>
                </div>
                <div className="flex items-center space-x-4 group cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#0a2472] group-hover:bg-[#0a2472] group-hover:text-white transition-all">
                    <FaMapMarkerAlt size={16} />
                  </div>
                  <span className="text-gray-400 group-hover:text-white transition-colors">Medical City, USA</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm font-medium">
            &copy; {currentYear} MediCare+. Built for human health.
          </p>
          <div className="flex space-x-8">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((text) => (
              <a key={text} href="#" className="text-gray-500 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors">
                {text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default UserFooter;
