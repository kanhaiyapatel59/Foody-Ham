import React, { useState, useEffect } from 'react';
import FoodCard from '../components/FoodCard';
import { useNavigate } from 'react-router-dom';
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

function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await api.get('/products');
      
      if (response.data.success) {
        // Transform backend data to match frontend format
        const products = response.data.data.map(product => ({
          id: product._id || product.id,
          name: product.name,
          image: product.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop',
          description: product.description,
          price: product.price,
          category: product.category,
          // Include other fields if needed
          ...(product._id && { _id: product._id }) // Keep MongoDB _id if exists
        }));
        
        setMenuItems(products);
      } else {
        setError('Failed to load products');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.response?.data?.message || 'Failed to load products. Please try again.');
      
      // Fallback to localStorage custom products if API fails
      const customProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');
      setMenuItems(customProducts);
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (item) => {
    navigate(`/product/${item.id}`, { state: { product: item } });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading products...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <div className="text-red-500 mb-4">{error}</div>
          <button
            onClick={fetchProducts}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">Our Menu</h1>
      <p className="text-center text-gray-600 mb-8">
        {menuItems.length} delicious items available
      </p>
      
      {menuItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No products available yet.</p>
          <p className="text-gray-500 mt-2">Check back soon or add your own products!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map(item => (
            <div key={item.id} onClick={() => handleProductClick(item)} className="cursor-pointer">
              <FoodCard {...item} />
              {item.category && (
                <div className="text-xs text-blue-600 mt-2 text-center">
                  {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MenuPage;