'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 font-heebo rtl" dir="rtl">
      <h2 className="text-3xl font-bold text-primary mb-6 text-right">צור קשר</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-10"
            >
              <div className="text-primary text-5xl mb-4">✓</div>
              <h3 className="text-2xl font-bold mb-2">תודה על פנייתך!</h3>
              <p className="text-gray-600 mb-4">נחזור אליך בהקדם האפשרי.</p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
              >
                שליחת הודעה נוספת
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-1">שם מלא</label>
                <motion.div
                  whileFocus={{ scale: 1.01 }}
                  className="relative"
                >
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="הכנס את שמך המלא"
                  />
                </motion.div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">טלפון</label>
                <motion.div
                  whileFocus={{ scale: 1.01 }}
                  className="relative"
                >
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="הכנס את מספר הטלפון שלך"
                    dir="ltr"
                  />
                </motion.div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-1">אימייל</label>
                <motion.div
                  whileFocus={{ scale: 1.01 }}
                  className="relative"
                >
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="הכנס את כתובת האימייל שלך"
                    dir="ltr"
                  />
                </motion.div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-1">הודעה</label>
                <motion.div
                  whileFocus={{ scale: 1.01 }}
                  className="relative"
                >
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                    placeholder="כתוב את הודעתך כאן..."
                  />
                </motion.div>
              </div>
              
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className={`w-full py-3 px-6 bg-primary text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all ${isSubmitting ? 'opacity-70' : ''}`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    שולח...
                  </span>
                ) : 'שלח פנייה'}
              </motion.button>
            </form>
          )}
        </div>
        
        {/* Contact Information */}
        <div className="bg-gradient-to-br from-primary to-secondary text-white p-6 rounded-lg shadow-md flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-6">פרטי התקשרות</h3>
            
            <ul className="space-y-6">
              <motion.li 
                className="flex items-center"
                whileHover={{ x: 5 }}
              >
                <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4">
                  <FiPhone className="text-xl" />
                </div>
                <div>
                  <p className="text-sm opacity-80">טלפון</p>
                  <p className="font-bold">04-1234567</p>
                </div>
              </motion.li>
              
              <motion.li 
                className="flex items-center"
                whileHover={{ x: 5 }}
              >
                <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4">
                  <FiMail className="text-xl" />
                </div>
                <div>
                  <p className="text-sm opacity-80">אימייל</p>
                  <p className="font-bold">info@gamma-cafe.co.il</p>
                </div>
              </motion.li>
              
              <motion.li 
                className="flex items-center"
                whileHover={{ x: 5 }}
              >
                <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4">
                  <FiMapPin className="text-xl" />
                </div>
                <div>
                  <p className="text-sm opacity-80">כתובת</p>
                  <p className="font-bold">רחוב הראשונים 123, תל אביב</p>
                </div>
              </motion.li>
            </ul>
          </div>
          
          <div className="mt-8 border-t border-white border-opacity-20 pt-6">
            <div className="flex items-center mb-4">
              <FiClock className="text-xl mr-2" />
              <h4 className="text-lg font-bold">שעות פעילות</h4>
            </div>
            
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>ראשון - חמישי:</span>
                <span>08:00 - 22:00</span>
              </li>
              <li className="flex justify-between">
                <span>שישי:</span>
                <span>08:00 - 15:00</span>
              </li>
              <li className="flex justify-between">
                <span>שבת:</span>
                <span>סגור</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;