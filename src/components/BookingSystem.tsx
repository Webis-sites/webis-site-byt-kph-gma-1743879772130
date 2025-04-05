'use client';

import React, { useState, useEffect } from 'react';
import { Calendar } from 'react-calendar';
import { format } from 'date-fns';
import { he } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaUsers, FaUser, FaPhone, FaEnvelope, FaComment } from 'react-icons/fa';

type BookingStep = 'date' | 'time' | 'details' | 'confirmation';

interface BookingDetails {
  date: Date | null;
  time: string;
  guests: number;
  name: string;
  phone: string;
  email: string;
  message: string;
}

const BookingSystem: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<BookingStep>('date');
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    date: null,
    time: '',
    guests: 1,
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  // Generate available times (would be replaced with actual API call in production)
  useEffect(() => {
    if (bookingDetails.date) {
      // Simulate fetching available times
      const times = [];
      for (let hour = 10; hour <= 22; hour++) {
        times.push(`${hour}:00`);
        if (hour < 22) times.push(`${hour}:30`);
      }
      setAvailableTimes(times);
    }
  }, [bookingDetails.date]);

  const handleDateSelect = (date: Date) => {
    setBookingDetails({ ...bookingDetails, date });
    setCurrentStep('time');
  };

  const handleTimeSelect = (time: string) => {
    setBookingDetails({ ...bookingDetails, time });
    setCurrentStep('details');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingDetails({ ...bookingDetails, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the booking data to your backend
    console.log('Booking submitted:', bookingDetails);
    setCurrentStep('confirmation');
  };

  const resetBooking = () => {
    setBookingDetails({
      date: null,
      time: '',
      guests: 1,
      name: '',
      phone: '',
      email: '',
      message: '',
    });
    setCurrentStep('date');
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return format(date, 'EEEE, d בMMMM yyyy', { locale: he });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'date':
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex flex-col items-center"
          >
            <h2 className="text-2xl font-bold mb-6 text-right w-full">בחר תאריך</h2>
            <div className="calendar-container">
              <Calendar
                onChange={handleDateSelect}
                value={bookingDetails.date}
                minDate={new Date()}
                className="rtl-calendar"
                locale="he-IL"
              />
            </div>
          </motion.div>
        );

      case 'time':
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex flex-col items-center"
          >
            <h2 className="text-2xl font-bold mb-6 text-right w-full">בחר שעה</h2>
            <p className="mb-4 text-right w-full">
              <FaCalendarAlt className="inline-block ml-2" />
              {formatDate(bookingDetails.date)}
            </p>
            <div className="grid grid-cols-3 gap-3 w-full">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  onClick={() => handleTimeSelect(time)}
                  className="bg-white border-2 border-primary hover:bg-primary hover:text-white transition-colors duration-300 py-2 px-4 rounded-lg text-center"
                >
                  {time}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentStep('date')}
              className="mt-6 text-secondary hover:text-primary transition-colors"
            >
              חזור לבחירת תאריך
            </button>
          </motion.div>
        );

      case 'details':
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full"
          >
            <h2 className="text-2xl font-bold mb-6 text-right">פרטי ההזמנה</h2>
            <div className="mb-6 text-right">
              <p className="mb-2">
                <FaCalendarAlt className="inline-block ml-2" />
                {formatDate(bookingDetails.date)}
              </p>
              <p className="mb-2">
                <FaClock className="inline-block ml-2" />
                שעה: {bookingDetails.time}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-right">
              <div className="form-group">
                <label htmlFor="guests" className="block mb-2 flex items-center justify-end">
                  <span>מספר סועדים</span>
                  <FaUsers className="ml-2" />
                </label>
                <select
                  id="guests"
                  name="guests"
                  value={bookingDetails.guests}
                  onChange={handleInputChange}
                  className="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none text-right"
                  required
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="name" className="block mb-2 flex items-center justify-end">
                  <span>שם מלא</span>
                  <FaUser className="ml-2" />
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={bookingDetails.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none text-right"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="block mb-2 flex items-center justify-end">
                  <span>טלפון</span>
                  <FaPhone className="ml-2" />
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={bookingDetails.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none text-right"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="block mb-2 flex items-center justify-end">
                  <span>אימייל</span>
                  <FaEnvelope className="ml-2" />
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={bookingDetails.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none text-right"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="block mb-2 flex items-center justify-end">
                  <span>הערות מיוחדות</span>
                  <FaComment className="ml-2" />
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={bookingDetails.message}
                  onChange={handleInputChange}
                  className="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none text-right"
                  rows={3}
                />
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setCurrentStep('time')}
                  className="text-secondary hover:text-primary transition-colors"
                >
                  חזור לבחירת שעה
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white py-2 px-6 rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  שלח הזמנה
                </button>
              </div>
            </form>
          </motion.div>
        );

      case 'confirmation':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="bg-green-100 border-2 border-green-500 rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4 text-green-700">ההזמנה התקבלה בהצלחה!</h2>
              <p className="text-lg">
                תודה {bookingDetails.name}, ההזמנה שלך לתאריך {formatDate(bookingDetails.date)} בשעה{' '}
                {bookingDetails.time} עבור {bookingDetails.guests} סועדים התקבלה.
              </p>
              <p className="mt-4">נשלח אליך אימייל אישור ל-{bookingDetails.email}</p>
            </div>
            <button
              onClick={resetBooking}
              className="bg-primary text-white py-2 px-6 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              הזמנה חדשה
            </button>
          </motion.div>
        );
    }
  };

  return (
    <div className="booking-system bg-white rounded-xl shadow-xl p-6 max-w-2xl mx-auto" dir="rtl">
      <h1 className="text-3xl font-bold mb-8 text-center text-primary">הזמנת שולחן</h1>
      
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <div className={`text-sm ${currentStep === 'date' ? 'text-primary font-bold' : ''}`}>תאריך</div>
          <div className={`text-sm ${currentStep === 'time' ? 'text-primary font-bold' : ''}`}>שעה</div>
          <div className={`text-sm ${currentStep === 'details' ? 'text-primary font-bold' : ''}`}>פרטים</div>
          <div className={`text-sm ${currentStep === 'confirmation' ? 'text-primary font-bold' : ''}`}>אישור</div>
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{
              width:
                currentStep === 'date'
                  ? '25%'
                  : currentStep === 'time'
                  ? '50%'
                  : currentStep === 'details'
                  ? '75%'
                  : '100%',
            }}
          ></div>
        </div>
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
      </div>
    </div>
  );
};

export default BookingSystem;