'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCoffee, FaIceCream, FaCookie, FaUtensils } from 'react-icons/fa';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'hot' | 'cold' | 'pastry' | 'meal';
}

const ProductsShowcase: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate fetching products from an API
    const fetchProducts = async () => {
      setIsLoading(true);
      // Mock data - in a real app, this would come from an API
      const mockProducts: Product[] = [
        {
          id: 1,
          name: 'אספרסו כפול',
          description: 'אספרסו חזק וארומטי עם שכבת קרמה עשירה',
          price: 12,
          image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          category: 'hot',
        },
        {
          id: 2,
          name: 'קפה קר',
          description: 'קפה קר מרענן עם קוביות קרח וחלב לבחירה',
          price: 16,
          image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          category: 'cold',
        },
        {
          id: 3,
          name: 'קרואסון שוקולד',
          description: 'קרואסון חמאה פריך במילוי שוקולד בלגי איכותי',
          price: 14,
          image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          category: 'pastry',
        },
        {
          id: 4,
          name: 'סלט יווני',
          description: 'סלט טרי עם עגבניות, מלפפונים, פלפלים, זיתים וגבינת פטה',
          price: 38,
          image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          category: 'meal',
        },
        {
          id: 5,
          name: 'לאטה',
          description: 'אספרסו עם חלב מוקצף וארומה עדינה',
          price: 14,
          image: 'https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          category: 'hot',
        },
        {
          id: 6,
          name: 'מילקשייק וניל',
          description: 'מילקשייק קרמי בטעם וניל עם קצפת',
          price: 22,
          image: 'https://images.unsplash.com/photo-1568901839119-631418a3910d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          category: 'cold',
        },
        {
          id: 7,
          name: 'עוגת גבינה',
          description: 'עוגת גבינה אפויה עם תחתית ביסקוויטים וציפוי פירות יער',
          price: 18,
          image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          category: 'pastry',
        },
        {
          id: 8,
          name: 'טוסט גבינות',
          description: 'טוסט עם מבחר גבינות, עגבניות וזיתים',
          price: 32,
          image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          category: 'meal',
        },
      ];
      
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  const filterProducts = (category: string) => {
    setActiveCategory(category);
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === category));
    }
  };

  const categoryIcons = {
    all: null,
    hot: <FaCoffee />,
    cold: <FaIceCream />,
    pastry: <FaCookie />,
    meal: <FaUtensils />,
  };

  const categoryNames = {
    all: 'הכל',
    hot: 'משקאות חמים',
    cold: 'משקאות קרים',
    pastry: 'מאפים',
    meal: 'ארוחות',
  };

  return (
    <div className="rtl-container py-10 px-4 md:px-8 bg-white" dir="rtl">
      <h2 className="text-3xl font-bold text-center mb-10 text-primary">התפריט שלנו</h2>
      
      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {Object.entries(categoryNames).map(([key, name]) => (
          <button
            key={key}
            onClick={() => filterProducts(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
              activeCategory === key
                ? 'bg-primary text-white shadow-md transform scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-secondary hover:text-white'
            }`}
          >
            {key !== 'all' && categoryIcons[key as keyof typeof categoryIcons]}
            {name}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              className="product-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded-full text-sm">
                  ₪{product.price}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2 text-gray-800">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <button className="w-full bg-secondary hover:bg-primary text-white py-2 rounded-md transition-colors duration-300">
                  הוסף להזמנה
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {filteredProducts.length === 0 && !isLoading && (
        <div className="text-center py-10">
          <p className="text-xl text-gray-500">לא נמצאו מוצרים בקטגוריה זו</p>
        </div>
      )}
    </div>
  );
};

export default ProductsShowcase;