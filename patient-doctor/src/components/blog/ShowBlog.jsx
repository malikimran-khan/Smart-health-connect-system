import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaSearch, FaCalendarAlt, FaUser, FaChevronRight, FaRegBookmark } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function ShowBlog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/blog/all`);
        setBlogs(res.data);
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
        setError('Failed to load blogs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#00072d] flex items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="w-16 h-16 border-4 border-[#0a2472] border-t-[#5eaf73] rounded-full animate-spin mx-auto" />
          <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Curating Health Insights...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#00072d] pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-10">
          <div className="space-y-4">
            <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
              <span className="text-xs font-black uppercase tracking-widest text-[#5eaf73]">Health Intelligence</span>
            </div>
            <h1 className="text-6xl font-black text-white tracking-tighter">
              Knowledge <span className="text-gradient">Hub</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-xl">
              Stay ahead with expert perspectives on modern medicine, wellness, and medical breakthroughs.
            </p>
          </div>

          <div className="relative w-full md:w-96 group">
            <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#0a2472] transition-colors" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-3xl py-5 pl-16 pr-6 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0a2472] transition-all backdrop-blur-xl"
            />
          </div>
        </div>

        {/* Blog Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="py-20 text-center bg-white/5 rounded-[3rem] border border-white/5 border-dashed">
            <div className="text-5xl mb-6">📭</div>
            <h3 className="text-2xl font-black text-white mb-2">No Articles Found</h3>
            <p className="text-gray-500 font-medium">Try broadening your search terms or check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredBlogs.map((blog, idx) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative bg-[#051650]/40 border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl backdrop-blur-xl flex flex-col"
              >
                {/* Image Section */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={`${API_URL}/uploads/blogs/${blog.blogImage}`}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00072d] to-transparent opacity-60" />
                  <div className="absolute top-6 left-6 px-4 py-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#5eaf73]">Article</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-6">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-[#0a2472]" />
                      {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    {blog.author && (
                      <div className="flex items-center gap-2">
                        <FaUser className="text-[#0a2472]" />
                        {blog.author}
                      </div>
                    )}
                  </div>

                  <h3 className="text-2xl font-black text-white mb-4 line-clamp-2 leading-tight group-hover:text-[#5eaf73] transition-colors font-sans">
                    {blog.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-8 font-medium">
                    {blog.description}
                  </p>

                  <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                    <Link
                      to={`/blog-detail/${blog._id}`}
                      className="flex items-center gap-3 text-white font-black text-xs uppercase tracking-widest group/btn"
                    >
                      Read Full Story
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover/btn:bg-[#0a2472] transition-colors">
                        <FaChevronRight size={8} />
                      </div>
                    </Link>

                    <button className="text-gray-500 hover:text-white transition-colors">
                      <FaRegBookmark />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
