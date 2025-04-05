'use client';

import React, { useState } from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface NewsletterFormData {
  email: string;
}

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('אנא הזן כתובת אימייל');
      return;
    }
    
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('אנא הזן כתובת אימייל תקינה');
      return;
    }
    
    // Here you would typically send the email to your API
    console.log('Submitting email:', email);
    setIsSubmitted(true);
    setError('');
    setEmail('');
    
    // Reset success message after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 pt-10 pb-6 dir-rtl">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-right">
          {/* Logo and About */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <img 
                src="/logo.png" 
                alt="בית קפה גמא" 
                className="h-16 inline-block"
              />
            </div>
            <p className="text-gray-600 mb-4">
              בית קפה גמא הוא מקום מפגש ייחודי המציע קפה איכותי, מאפים טריים ואווירה נעימה. אנו מזמינים אתכם להתארח אצלנו וליהנות מחוויה קולינרית מיוחדת.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-primary font-bold text-lg mb-4">ניווט מהיר</h3>
            <ul className="space-y-2">
              {['דף הבית', 'תפריט', 'אודות', 'אירועים', 'צור קשר'].map((item) => (
                <li key={item}>
                  <motion.a 
                    href={`/${item === 'דף הבית' ? '' : item.toLowerCase()}`}
                    className="text-gray-600 hover:text-primary transition-colors duration-300 inline-block"
                    whileHover={{ x: -5 }}
                  >
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="md:col-span-1">
            <h3 className="text-primary font-bold text-lg mb-4">צור קשר</h3>
            <ul className="space-y-3">
              <li className="flex items-center justify-end">
                <span className="text-gray-600 mr-2">רחוב הראשונים 123, תל אביב</span>
                <FaMapMarkerAlt className="text-secondary" />
              </li>
              <li className="flex items-center justify-end">
                <span className="text-gray-600 mr-2">03-1234567</span>
                <FaPhone className="text-secondary" />
              </li>
              <li className="flex items-center justify-end">
                <span className="text-gray-600 mr-2">info@cafe-gamma.co.il</span>
                <FaEnvelope className="text-secondary" />
              </li>
            </ul>
            
            <h3 className="text-primary font-bold text-lg mt-6 mb-3">שעות פתיחה</h3>
            <p className="text-gray-600">ראשון-חמישי: 08:00-22:00</p>
            <p className="text-gray-600">שישי-שבת: 09:00-23:00</p>
          </div>
          
          {/* Newsletter */}
          <div className="md:col-span-1">
            <h3 className="text-primary font-bold text-lg mb-4">הרשמה לניוזלטר</h3>
            <p className="text-gray-600 mb-4">הירשמו לניוזלטר שלנו וקבלו עדכונים על מבצעים ואירועים מיוחדים</p>
            
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="הזינו את האימייל שלכם"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-right"
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
              <motion.button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors duration-300 w-full"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                הרשמה
              </motion.button>
              {isSubmitted && (
                <p className="text-green-500 text-sm">תודה שנרשמת! בקרוב תקבל/י מאיתנו עדכונים</p>
              )}
            </form>
            
            <div className="mt-6 flex justify-end space-x-4 space-x-reverse">
              <motion.a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
              >
                <FaInstagram className="text-2xl text-gray-600 hover:text-primary transition-colors duration-300" />
              </motion.a>
              <motion.a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
              >
                <FaFacebook className="text-2xl text-gray-600 hover:text-primary transition-colors duration-300" />
              </motion.a>
              <motion.a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
              >
                <FaTwitter className="text-2xl text-gray-600 hover:text-primary transition-colors duration-300" />
              </motion.a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} בית קפה גמא. כל הזכויות שמורות.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;