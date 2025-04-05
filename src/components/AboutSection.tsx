'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Image from 'next/image';

interface AboutSectionProps {
  teamImages?: string[];
  cafeImages?: string[];
}

const AboutSection: React.FC<AboutSectionProps> = ({
  teamImages = [
    'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  ],
  cafeImages = [
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2047&q=80',
    'https://images.unsplash.com/photo-1445116572660-236099ec97a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
  ],
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="bg-cream py-16 px-4 md:px-8 lg:px-16 overflow-hidden" id="about">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="flex flex-col lg:flex-row items-center gap-12"
        >
          {/* Text Content */}
          <motion.div variants={itemVariants} className="lg:w-1/2 text-right" dir="rtl">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-coffee-dark mb-6">
              אודות בית קפה גמא
            </h2>
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-coffee-medium mb-6 leading-relaxed">
              אנחנו בית קפה מוביל בתחום המזון עם ניסיון של שנים רבות. אנחנו מתמחים במתן שירות מקצועי ואיכותי ללקוחותינו.
            </motion.p>
            <motion.p variants={itemVariants} className="text-base md:text-lg text-coffee-medium mb-8 leading-relaxed">
              בבית קפה גמא, אנו מאמינים שכוס קפה טובה היא יותר מסתם משקה - היא חוויה. הקפה שלנו נבחר בקפידה מהמקורות הטובים ביותר, והצוות המקצועי שלנו מכין כל כוס בתשומת לב מירבית.
            </motion.p>
            <motion.div variants={itemVariants}>
              <button className="bg-coffee-dark text-cream py-3 px-6 rounded-md hover:bg-coffee-medium transition-colors duration-300 text-lg font-medium">
                קרא עוד
              </button>
            </motion.div>
          </motion.div>

          {/* Images Grid */}
          <motion.div variants={itemVariants} className="lg:w-1/2 grid grid-cols-2 gap-4">
            {/* Team Images */}
            <motion.div variants={imageVariants} className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-xl">
              <Image
                src={teamImages[0]}
                alt="צוות בית קפה גמא"
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
            <motion.div variants={imageVariants} className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-xl">
              <Image
                src={cafeImages[0]}
                alt="חלל בית קפה גמא"
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
            <motion.div variants={imageVariants} className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-xl">
              <Image
                src={cafeImages[1]}
                alt="חלל בית קפה גמא"
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
            <motion.div variants={imageVariants} className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-xl">
              <Image
                src={teamImages[1]}
                alt="צוות בית קפה גמא"
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;