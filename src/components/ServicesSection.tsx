'use client';

import React, { useEffect, useRef } from 'react';
import { FaCoffee, FaUtensils, FaTruck, FaCalendarAlt } from 'react-icons/fa';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, delay }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: delay * 0.2,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={cardVariants}
      className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-right rtl"
    >
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary mb-4 text-white text-2xl">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 w-full text-right">{title}</h3>
      <p className="text-gray-600 w-full text-right">{description}</p>
    </motion.div>
  );
};

const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: <FaCalendarAlt />,
      title: "אירוח אירועים",
      description: "אנו מציעים מרחב ייחודי לאירועים פרטיים ועסקיים עם תפריט מותאם אישית לצרכים שלכם.",
    },
    {
      icon: <FaUtensils />,
      title: "קייטרינג",
      description: "שירותי קייטרינג איכותיים לכל אירוע, כולל מנות מיוחדות מהמטבח שלנו.",
    },
    {
      icon: <FaCoffee />,
      title: "סדנאות קפה",
      description: "למדו את אמנות הקפה מהבריסטות המקצועיים שלנו בסדנאות אינטראקטיביות.",
    },
    {
      icon: <FaTruck />,
      title: "משלוחים",
      description: "הקפה והמאפים הטריים שלנו מגיעים ישירות אליכם הביתה או למשרד.",
    },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section ref={sectionRef} className="py-16 bg-secondary/10">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={headerVariants}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-2 text-right w-full">השירותים שלנו</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-right w-full">
            בבית קפה גמא אנחנו מציעים מגוון שירותים מיוחדים שיהפכו כל ביקור לחוויה בלתי נשכחת
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;