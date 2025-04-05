'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { FaStar, FaStarHalfAlt, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  id: number;
  name: string;
  image: string;
  rating: number;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'דניאל לוי',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
    quote: 'הקפה הטוב ביותר בעיר! האווירה נעימה והצוות מקסים. אני מגיע לכאן כל בוקר לפני העבודה.'
  },
  {
    id: 2,
    name: 'מיכל כהן',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 4.5,
    quote: 'העוגות שלהם מדהימות והקפה תמיד טרי. המקום מושלם לפגישות עבודה או סתם לשבת עם חברים.'
  },
  {
    id: 3,
    name: 'יוסי אברהם',
    image: 'https://randomuser.me/api/portraits/men/62.jpg',
    rating: 5,
    quote: 'גיליתי את בית הקפה הזה לפני חודש ומאז אני מכור! השירות מעולה והאוכל טעים ביותר.'
  },
  {
    id: 4,
    name: 'רונית שמעוני',
    image: 'https://randomuser.me/api/portraits/women/58.jpg',
    rating: 4,
    quote: 'מקום מקסים עם אווירה ביתית. אני אוהבת במיוחד את מבחר התה שלהם והמאפים הטריים.'
  },
  {
    id: 5,
    name: 'אלון דוד',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
    rating: 5,
    quote: 'בית הקפה האהוב עליי בשכונה. המחירים הוגנים והאיכות מעולה. ממליץ בחום!'
  }
];

const RatingStars: React.FC<{ rating: number }> = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`star-${i}`} className="text-primary inline-block" />);
  }

  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half-star" className="text-primary inline-block" />);
  }

  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaStar key={`empty-star-${i}`} className="text-gray-300 inline-block" />);
  }

  return <div className="flex">{stars}</div>;
};

const TestimonialsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, []);

  const goToPrevious = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAutoPlaying) {
      interval = setInterval(goToNext, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, goToNext]);

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0
    })
  };

  return (
    <div 
      className="relative bg-white rounded-lg shadow-xl p-6 max-w-4xl mx-auto my-12 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h2 className="text-3xl font-bold text-right mb-8 text-secondary">המלצות מלקוחותינו</h2>
      
      <div className="relative h-80">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute w-full h-full"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 h-full">
              <div className="md:w-1/3 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary mb-4">
                  <img 
                    src={testimonials[currentIndex].image} 
                    alt={testimonials[currentIndex].name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{testimonials[currentIndex].name}</h3>
                <RatingStars rating={testimonials[currentIndex].rating} />
              </div>
              
              <div className="md:w-2/3 flex items-center">
                <div className="bg-gray-50 p-6 rounded-lg shadow-inner relative">
                  <div className="absolute top-4 right-4 text-5xl text-primary opacity-20">"</div>
                  <p className="text-right text-lg leading-relaxed relative z-10 font-medium text-gray-700">
                    {testimonials[currentIndex].quote}
                  </p>
                  <div className="absolute bottom-4 left-4 text-5xl text-primary opacity-20">"</div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="flex justify-between mt-8">
        <button 
          onClick={goToPrevious}
          className="bg-primary hover:bg-opacity-80 text-white rounded-full p-3 shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none"
          aria-label="הקודם"
        >
          <FaChevronLeft />
        </button>
        
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-primary scale-125' : 'bg-secondary bg-opacity-50'
              }`}
              aria-label={`המלצה ${index + 1}`}
            />
          ))}
        </div>
        
        <button 
          onClick={goToNext}
          className="bg-primary hover:bg-opacity-80 text-white rounded-full p-3 shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none"
          aria-label="הבא"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;