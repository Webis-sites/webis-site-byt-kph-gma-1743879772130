'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';

// Define types for our gallery items
interface GalleryItem {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}

const PortfolioGallery: React.FC = () => {
  // Sample gallery data - replace with your actual data
  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: "חלל בית הקפה",
      category: "חלל",
      imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24",
      description: "עיצוב מודרני של חלל הישיבה המרכזי"
    },
    {
      id: 2,
      title: "פינת ישיבה חיצונית",
      category: "חלל",
      imageUrl: "https://images.unsplash.com/photo-1445116572660-236099ec97a0",
      description: "פינת ישיבה נעימה בחצר בית הקפה"
    },
    {
      id: 3,
      title: "קפה מיוחד",
      category: "מנות",
      imageUrl: "https://images.unsplash.com/photo-1511920170033-f8396924c348",
      description: "קפה איכותי בהכנה מיוחדת"
    },
    {
      id: 4,
      title: "מנת בוקר",
      category: "מנות",
      imageUrl: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666",
      description: "ארוחת בוקר עשירה וטעימה"
    },
    {
      id: 5,
      title: "אירוע ערב",
      category: "אירועים",
      imageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205",
      description: "אירוע ערב מיוחד שנערך בבית הקפה"
    },
    {
      id: 6,
      title: "הרצאה",
      category: "אירועים",
      imageUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2",
      description: "הרצאה מרתקת שהתקיימה במתחם"
    },
  ];

  // State management
  const [items, setItems] = useState<GalleryItem[]>(galleryItems);
  const [selectedCategory, setSelectedCategory] = useState<string>('הכל');
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Categories for filtering
  const categories = ['הכל', ...Array.from(new Set(galleryItems.map(item => item.category)))];

  // Filter items based on category and search term
  useEffect(() => {
    let filtered = galleryItems;
    
    if (selectedCategory !== 'הכל') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title.includes(searchTerm) || 
        item.description.includes(searchTerm) || 
        item.category.includes(searchTerm)
      );
    }
    
    setItems(filtered);
  }, [selectedCategory, searchTerm, galleryItems]);

  // Lightbox navigation
  const navigateLightbox = useCallback((direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentImageIndex(prev => (prev + 1) % items.length);
    } else {
      setCurrentImageIndex(prev => (prev - 1 + items.length) % items.length);
    }
  }, [items.length]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      
      if (e.key === 'Escape') {
        setLightboxOpen(false);
      } else if (e.key === 'ArrowRight') {
        navigateLightbox('prev'); // Right arrow in RTL moves to previous
      } else if (e.key === 'ArrowLeft') {
        navigateLightbox('next'); // Left arrow in RTL moves to next
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, navigateLightbox]);

  // Open lightbox with specific image
  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="portfolio-gallery-container rtl text-right p-4 md:p-8">
      <h2 className="text-3xl font-bold mb-6 text-primary">גלריית בית קפה גמא</h2>
      
      {/* Search and filter controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-secondary text-gray-800 hover:bg-primary hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="חיפוש..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      
      {/* Gallery grid */}
      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              className="gallery-item bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => openLightbox(index)}
              whileHover={{ scale: 1.03 }}
            >
              <div className="relative h-60 w-full">
                <Image 
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute top-2 right-2 bg-primary text-white text-sm px-2 py-1 rounded-full">
                  {item.category}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">לא נמצאו פריטים מתאימים לחיפוש שלך</p>
        </div>
      )}
      
      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && items[currentImageIndex] && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
          >
            <button 
              className="absolute top-4 right-4 text-white text-2xl z-10 hover:text-primary transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxOpen(false);
              }}
            >
              <FaTimes />
            </button>
            
            <button 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-opacity-40 transition-all z-10"
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox('prev');
              }}
            >
              <FaChevronRight />
            </button>
            
            <button 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-opacity-40 transition-all z-10"
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox('next');
              }}
            >
              <FaChevronLeft />
            </button>
            
            <motion.div 
              className="relative max-w-4xl max-h-[80vh] w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[70vh]">
                <Image 
                  src={items[currentImageIndex].imageUrl}
                  alt={items[currentImageIndex].title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
              <div className="bg-white p-4 rounded-b-lg">
                <h3 className="text-xl font-bold">{items[currentImageIndex].title}</h3>
                <p className="text-gray-600 mt-1">{items[currentImageIndex].description}</p>
                <p className="text-primary mt-2 text-sm">{items[currentImageIndex].category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioGallery;