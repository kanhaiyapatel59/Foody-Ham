import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FoodCard from '../components/FoodCard';
import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function HomePage() {
  const [featuredFoods, setFeaturedFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await api.get('/products?limit=3');
      
      if (response.data.success) {
        const products = response.data.data.map(product => ({
          id: product._id || product.id,
          name: product.name,
          image: product.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop',
          description: product.description,
          price: product.price,
          category: product.category
        }));
        
        setFeaturedFoods(products);
      }
    } catch (err) {
      console.error('Error fetching featured products:', err);
      // Use empty array if API fails
      setFeaturedFoods([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop" 
          alt="Restaurant Interior" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to Foody-Ham
            </h1>
            <p className="text-xl mb-6">Your Go-To for Delicious Foods!</p>
            <Link 
              to="/menu" 
              className="bg-orange-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition duration-300 inline-block"
            >
              Order Now
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Foods */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Featured Foods</h2>
        
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="text-lg text-gray-600">Loading featured products...</div>
          </div>
        ) : featuredFoods.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No featured products available.</p>
            <Link to="/menu" className="text-orange-500 hover:text-orange-600 mt-2 inline-block">
              Browse all products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredFoods.map(food => (
              <FoodCard key={food.id} {...food} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default HomePage;