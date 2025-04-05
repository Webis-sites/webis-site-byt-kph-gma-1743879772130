'use client';

import React from 'react';
import Hero from '@/components/Hero';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProductsShowcase from '../components/ProductsShowcase';
import ServicesSection from '../components/ServicesSection';
import PortfolioGallery from '../components/PortfolioGallery';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import BookingSystem from '../components/BookingSystem';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Hero 
        title="בית קפה גמא" 
        subtitle="בית קפה" 
      />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* כאן יתווספו הקומפוננטות שייווצרו על ידי המחולל */}
        <HeroSection />
    <AboutSection />
    <ProductsShowcase />
    <ServicesSection />
    <PortfolioGallery />
    <TestimonialsCarousel />
    <BookingSystem />
  </main>
      
      <footer className="py-6 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; 2025 בית קפה גמא. כל הזכויות שמורות.
        </div>
      </footer>
    </div>
  );
}