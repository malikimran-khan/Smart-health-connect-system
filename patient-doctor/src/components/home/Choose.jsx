import React from 'react';
import { motion } from 'framer-motion';
// import { fadeIn } from '../Variatns';
import chooseImg from '../../assets/medical2.jpeg';
import { FaShieldAlt, FaClock, FaUserMd, FaMobileAlt, FaThumbsUp, FaChartLine } from 'react-icons/fa';

const Choose = () => {
  return (
    <>
    <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Image Section */}
        <motion.div className="w-full lg:w-1/2">
  <img 
    src={chooseImg} 
    alt="Quality Healthcare" 
    className="rounded-xl w-full max-w-[1200px] h-100 object-fill"
  />
</motion.div>

        {/* Content Section */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Why Choose Our <span className="text-blue-600">Health Services</span>
          </h2>
          
          <p className="text-lg text-gray-600 mb-8">
            We're committed to providing exceptional healthcare experiences that put 
            <span className="font-semibold text-blue-600"> your well-being first</span>. 
            Here's what sets us apart:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500 hover:shadow-lg transition"
            >
              <div className="flex items-start">
                <FaShieldAlt className="text-blue-500 text-2xl mr-4 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Trusted Care</h3>
                  <p className="text-gray-600">
                    Board-certified physicians with proven expertise in their specialties.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500 hover:shadow-lg transition"
            >
              <div className="flex items-start">
                <FaClock className="text-green-500 text-2xl mr-4 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Quick Access</h3>
                  <p className="text-gray-600">
                    Same-day appointments available for urgent health concerns.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500 hover:shadow-lg transition"
            >
              <div className="flex items-start">
                <FaUserMd className="text-purple-500 text-2xl mr-4 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Personalized Care</h3>
                  <p className="text-gray-600">
                    Treatment plans tailored to your unique health needs and goals.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 4 */}
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500 hover:shadow-lg transition"
            >
              <div className="flex items-start">
                <FaMobileAlt className="text-yellow-500 text-2xl mr-4 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Digital Convenience</h3>
                  <p className="text-gray-600">
                    Easy online booking, telehealth options, and digital records.
                  </p>
                </div>
              </div>
            </motion.div>

           
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-xl shadow-md border-l-4 border-teal-500 hover:shadow-lg transition"
            >
              <div className="flex items-start">
                <FaChartLine className="text-teal-500 text-2xl mr-4 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Proven Results</h3>
                  <p className="text-gray-600">
                    Evidence-based treatments with measurable health outcomes.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Choose;