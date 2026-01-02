import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaUser, FaArrowLeft, FaClock, FaShareAlt, FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';
import { IoMdTime } from 'react-icons/io';

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [descriptionParts, setDescriptionParts] = useState([]);
  const [readingTime, setReadingTime] = useState(0);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/blog/${id}`);
        setBlog(res.data);
        const words = res.data.description.split(/\s+/).length;
        setReadingTime(Math.ceil(words / 200));
        const paragraphs = res.data.description.split('\n').filter(p => p.trim() !== '');
        setDescriptionParts(paragraphs);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#00072d] flex items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="w-16 h-16 border-4 border-[#0a2472] border-t-[#5eaf73] rounded-full animate-spin mx-auto" />
          <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Opening Medical Journal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#00072d] pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Navigation & Actions */}
        <div className="flex justify-between items-center mb-12">
          <motion.button
            whileHover={{ x: -10 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-4 text-gray-500 hover:text-white font-bold transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-[#0a2472] transition-all">
              <FaArrowLeft size={12} />
            </div>
            <span>Catalog</span>
          </motion.button>

          <div className="flex gap-4">
            {[FaLinkedin, FaTwitter, FaFacebook].map((Icon, i) => (
              <button key={i} className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-500 hover:text-white hover:bg-[#0a2472] transition-all">
                <Icon size={14} />
              </button>
            ))}
          </div>
        </div>

        {/* Article Header */}
        <header className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 bg-white/5 border border-[#0a2472]/30 rounded-full mb-8"
          >
            <span className="text-[10px] font-black uppercase tracking-widest text-[#5eaf73]">Medical Research</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-[1.1]"
          >
            {blog.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 font-medium mb-10 leading-relaxed border-l-4 border-[#0a2472] pl-8"
          >
            {blog.subheading}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-8 py-8 border-y border-white/5 font-black uppercase tracking-widest text-[10px]"
          >
            <div className="flex items-center gap-3 text-white">
              <div className="w-8 h-8 rounded-full bg-[#0a2472] flex items-center justify-center border border-white/10">
                <FaUser size={10} className="text-[#5eaf73]" />
              </div>
              <span>{blog.author || 'Medical Team'}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-500">
              <FaCalendarAlt className="text-[#0a2472]" />
              {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
            <div className="flex items-center gap-3 text-gray-500">
              <FaClock className="text-[#0a2472]" />
              {readingTime} MIN READ
            </div>
          </motion.div>
        </header>

        {/* Featured Media */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[3rem] overflow-hidden border border-white/10 mb-20 shadow-4xl group"
        >
          <img
            src={`${API_URL}/uploads/blogs/${blog.blogImage}`}
            alt={blog.title}
            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
        </motion.div>

        {/* Article Body */}
        <article className="max-w-3xl mx-auto">
          <div className="space-y-8">
            {descriptionParts.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-gray-300 text-lg leading-[1.8] font-medium tracking-tight"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {blog.descriptionImage && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="my-20 rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl"
            >
              <img
                src={`${API_URL}/uploads/blogs/${blog.descriptionImage}`}
                alt="Contextual Media"
                className="w-full h-auto object-cover"
              />
            </motion.div>
          )}

          {/* Footer of Article */}
          <div className="mt-20 p-12 bg-white/5 border border-white/5 rounded-[3rem] text-center backdrop-blur-xl">
            <h4 className="text-white font-black text-xl mb-4">Did you find this insightful?</h4>
            <div className="flex justify-center gap-4">
              <button className="px-8 py-3 bg-[#0a2472] text-white font-black rounded-2xl hover:scale-105 transition-all">Yes, very</button>
              <button className="px-8 py-3 bg-white/5 text-gray-400 font-bold border border-white/5 rounded-2xl">Not quite</button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
