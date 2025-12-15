import React, { useState, useEffect, useCallback } from 'react';
import FoodCard from '../components/FoodCard';
// 🚨 CHANGE: Imported Link from react-router-dom
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

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

// Image URLs provided by the user (Using the same ones as HomePage)
const BACKGROUND_IMAGES = [
    "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",
    "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg",
    "https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg",
    "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg",
];

// Placeholder categories for the filter dropdown
const CATEGORIES = ['all', 'pizza', 'salad', 'pasta', 'dessert'];


function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [bgImageIndex, setBgImageIndex] = useState(0);
  const navigate = useNavigate();
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [debouncedCategory, setDebouncedCategory] = useState('all');

  // Background Slider Effect
  useEffect(() => {
    const intervalId = setInterval(() => {
        setBgImageIndex(prevIndex => (prevIndex + 1) % BACKGROUND_IMAGES.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  // Debounce search and category state changes
  useEffect(() => {
      const searchHandler = setTimeout(() => {
          setDebouncedSearch(searchQuery);
      }, 500);

      return () => {
          clearTimeout(searchHandler);
      };
  }, [searchQuery]);

  useEffect(() => {
    setDebouncedCategory(selectedCategory);
  }, [selectedCategory]);


  // Data Fetching Logic
  const fetchProducts = useCallback(async (category, search) => {
    try {
      setLoading(true);
      setError('');

      const params = new URLSearchParams();
      if (category && category !== 'all') {
          params.append('category', category);
      }
      if (search) {
          params.append('search', search);
      }

      const response = await api.get(`/products?${params.toString()}`);

      if (response.data.success) {
        const products = response.data.data.map(product => ({
          id: product._id || product.id,
          name: product.name,
          image: product.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop',
          description: product.description,
          price: product.price,
          category: product.category,
          ...(product._id && { _id: product._id })
        }));

        setMenuItems(products);
      } else {
        setError('Failed to load products');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.response?.data?.message || 'Failed to load products. Please try again.');

      // Fallback to local data on error
      const customProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');
      setMenuItems(customProducts);
    } finally {
      setLoading(false);
    }
  }, []);

  // Trigger data fetch whenever debounced states change
  useEffect(() => {
    fetchProducts(debouncedCategory, debouncedSearch);
  }, [fetchProducts, debouncedCategory, debouncedSearch]);


  // 🚨 REMOVED: handleProductClick function is no longer needed

  if (loading && menuItems.length === 0) {
    return (
      <div className="relative min-h-screen bg-gray-900">
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <div className="text-white text-lg font-semibold">Loading delicious menu...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-900">
      {/* Fixed Background - **ADJUSTED FOR VISIBILITY** */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden">
          <img
              src={BACKGROUND_IMAGES[bgImageIndex]}
              alt="Food background"
              className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
              // 🚨 FIX: Increased brightness to 0.45. The image is now visibly dark/blurred but not totally black.
              style={{ filter: 'brightness(0.45) blur(3px)' }}
          />
          {/* 🚨 Removed the bg-black/60 overlay to further lighten the background */}
          <div className="absolute inset-0 bg-black/40"></div> {/* Using a lighter 40% overlay instead */}
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        
        {/* Header Section - Enhanced Visibility */}
        <div className="text-center mb-12 pt-8 p-6 mx-auto max-w-2xl 

                        rounded-xl border border-white/10 shadow-2xl">
          <div className="inline-block mb-4">
            <span className="text-5xl md:text-5xl font-bold text-white">FOODY IT'S NOT JUST</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Food, It's an <span className="text-red-500">Experience</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full mb-8"></div>
        </div>

        {/* Search and Filter Section - Attractive Dark Theme */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gray-800/90 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 shadow-xl">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                    type="text"
                    placeholder="Search dishes by name or ingredients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 p-4 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                />
              </div>

              {/* Category Filter */}
              <div className="relative md:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full pl-10 p-4 bg-gray-700 border border-gray-600 rounded-xl text-white appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                >
                    <option value="all" className="bg-gray-700 text-white">All Categories</option>
                    {CATEGORIES.filter(cat => cat !== 'all').map(cat => (
                        <option key={cat} value={cat} className="bg-gray-700 text-white">
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                    ))}
                </select>
              </div>

              {/* Results Count Badge */}
              <div className="flex items-center justify-center md:justify-start">
                <span className="px-4 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-xl font-semibold shadow-md">
                  {menuItems.length} {menuItems.length === 1 ? 'Item' : 'Items'} Found
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
            <div className="max-w-4xl mx-auto mb-8">
              <div className="bg-red-900/90 backdrop-blur-sm p-6 rounded-2xl border border-red-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-red-300">{error}</span>
                  </div>
                  <button
                      onClick={() => fetchProducts(debouncedCategory, debouncedSearch)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
                  >
                    Retry
                  </button>
                </div>
              </div>
            </div>
        )}

        {/* Product Grid - Dark Cards */}
        {menuItems.length === 0 && !loading ? (
          <div className="max-w-4xl mx-auto text-center py-16">
            <div className="bg-gray-800/90 backdrop-blur-sm p-12 rounded-2xl border border-gray-700 shadow-xl">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-700 rounded-full flex items-center justify-center shadow-inner">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">No Results Found</h3>
              <p className="text-gray-400 text-lg mb-6">
                Try adjusting your search or filter to discover our delicious offerings
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all shadow-md"
              >
                Clear Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            {/* Grid with dark cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {menuItems.map(item => (
                // 🚨 FIX: Replaced div and onClick with a single Link component
                <Link
                  key={item.id}
                  to={`/product/${item.id}`} // Uses the correct path for navigation
                  state={{ product: item }} // Pass item data via state
                  className="group block transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-2"
                >
                  {/* FoodCard with dark background and removed description */}
                  <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-700">
                    {/* IMPORTANT: FoodCard MUST NOT contain any nested <a> or <Link> tags now */}
                    <FoodCard
                      {...item}
                      className="bg-gray-800" // Ensure the FoodCard wrapper is dark
                    />
                    <div className="p-4 pt-2">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-white group-hover:text-red-500 transition-colors leading-tight">
                          {item.name}
                        </h3>
                        {/* Price moved up and made prominent */}
                        <span className="text-2xl font-extrabold text-red-500 ml-4">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                      
                      {item.category && (
                        <div className="mt-3">
                          <span className="inline-block px-3 py-1 bg-red-900/50 text-red-300 text-sm font-medium rounded-full border border-red-900">
                            {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-16 text-center pb-8">
          <p className="text-gray-400 text-sm">
            Can't find what you're looking for?
            <button
              onClick={() => navigate('/contact')}
              className="ml-2 text-red-500 hover:text-red-600 font-medium transition-colors"
            >
              Contact our chef
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default MenuPage;