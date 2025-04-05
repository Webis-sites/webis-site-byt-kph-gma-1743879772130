'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  onCallToAction?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onCallToAction }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleCallToAction = () => {
    if (onCallToAction) {
      onCallToAction();
    } else {
      console.log('Call to action clicked');
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden" dir="rtl">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80')",
          filter: "brightness(0.7)"
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      
      {/* Content Container */}
      <div className="relative h-full flex flex-col justify-center items-end px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-right"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            בית קפה מוביל בישראל
          </h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl lg:text-3xl text-gray-100 mb-8"
          >
            חווית לקוח מושלמת בכל ביקור
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <button
              onClick={handleCallToAction}
              className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              קבע תור עכשיו
            </button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative Element */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-0 left-0 w-1/3 h-24 bg-secondary opacity-80 rounded-tr-full"
      />
    </div>
  );
};

export default HeroSection;