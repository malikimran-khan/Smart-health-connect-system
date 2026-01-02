import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaBlog, FaChevronRight, FaRegCalendarAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function ShowBlog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/blog/all');
        setBlogs(res.data);
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
        setError('Verification failed: Could not establish connection to blog repository.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-[#123499]/20 border-t-[#123499] rounded-full"
        />
        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Fetching Publications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card p-12 rounded-[3rem] text-center border-l-4 border-red-500">
        <h3 className="text-xl font-black text-[#00072d] mb-2">Access Denied</h3>
        <p className="text-red-500 font-bold text-sm mb-6">{error}</p>
        <button onClick={() => window.location.reload()} className="px-8 py-3 bg-[#123499] text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-[#123499]/20">Retry Handshake</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <h2 className="text-4xl font-black text-[#00072d] tracking-tight mb-2">Our Publications</h2>
          <p className="text-gray-400 font-medium">Manage clinical insights and healthcare news articles.</p>
        </div>
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/insert-blog')}
            className="flex items-center gap-3 bg-[#123499] text-white font-black text-xs uppercase tracking-[0.15em] py-4 px-8 rounded-2xl shadow-xl shadow-[#123499]/20 transition-all"
          >
            <FaPlus size={12} /> New Publication
          </motion.button>
        </div>
      </motion.div>

      {blogs.length === 0 ? (
        <div className="glass-card p-20 rounded-[3rem] text-center">
          <FaBlog className="mx-auto text-gray-200 mb-6" size={60} />
          <p className="text-gray-400 font-black uppercase tracking-widest leading-relaxed">The repository is currently empty.<br />Start by creating your first publication.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card rounded-[2.5rem] overflow-hidden group hover:shadow-2xl hover:shadow-[#0a2472]/10 transition-all duration-500 flex flex-col"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={`http://localhost:8000/uploads/blogs/${blog.blogImage}`}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00072d]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
                  <p className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                    <FaRegCalendarAlt size={10} /> {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-xl font-black text-[#00072d] mb-4 group-hover:text-[#123499] transition-colors line-clamp-2 leading-tight">
                  {blog.title}
                </h3>
                <p className="text-gray-400 text-sm font-medium line-clamp-3 mb-8 flex-1">
                  {blog.description}
                </p>
                <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#5eaf73]/10 text-[#5eaf73] flex items-center justify-center">
                      <FaBlog size={10} />
                    </div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Article</span>
                  </div>
                  <Link
                    to={`/blog-detail/${blog._id}`}
                    className="flex items-center gap-2 text-xs font-black text-[#123499] uppercase tracking-widest hover:translate-x-2 transition-transform"
                  >
                    Read More <FaChevronRight size={10} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
