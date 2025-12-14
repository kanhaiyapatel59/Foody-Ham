import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { FaPlusCircle, FaTimesCircle, FaCheckCircle, FaUserShield } from 'react-icons/fa';

// Create axios instance (re-use pattern from Auth/Cart Contexts)
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

function AddProductPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    ingredients: '',
    fullDescription: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    category: ''
  });

  // State for added products
  const [addedProducts, setAddedProducts] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setError(''); // Clear error when user starts typing
  };

  // Fetch recently added products
  const fetchRecentProducts = async () => {
    try {
      // Fetch the most recent 5 products
      const response = await api.get('/products?limit=5&sort=-createdAt');
      
      if (response.data.success) {
        setAddedProducts(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      // Fallback for demo/dev purposes
      const savedProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');
      setAddedProducts(savedProducts);
    }
  };

  // Load added products on component mount
  useEffect(() => {
    fetchRecentProducts();
  }, []); // Empty dependency array means run once on mount

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Authorization Check (Client-side fail-fast)
    if (!user) {
      setError('Please login to add products');
      navigate('/login', { state: { from: '/add-product' } });
      return;
    }

    if (!user.isAdmin) {
      setError('Only administrators can add products');
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Validate required fields
      if (!formData.name || !formData.description || !formData.price || !formData.category || !formData.fullDescription) {
        throw new Error('Please fill in all required fields (Name, Category, Short Description, Price, Full Description)');
      }
      
      // Basic price validation
      const price = parseFloat(formData.price);
      if (isNaN(price) || price <= 0) {
        throw new Error('Price must be a valid positive number.');
      }


      // Prepare product data for backend
      const productData = {
        name: formData.name,
        description: formData.description,
        price: price, // Already validated float
        image: formData.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop',
        ingredients: formData.ingredients 
          ? formData.ingredients.split(',').map(item => item.trim()).filter(item => item !== '')
          : [],
        fullDescription: formData.fullDescription,
        nutritionalInfo: {
          calories: parseInt(formData.calories) || 0,
          protein: formData.protein || "0g",
          carbs: formData.carbs || "0g",
          fat: formData.fat || "0g"
        },
        category: formData.category
      };

      // Send POST request to backend using the configured Axios instance
      const response = await api.post('/products', productData);

      if (response.data.success) {
        const newProduct = response.data.data;
        
        // Add new product to the start of the local state list (most recent first)
        setAddedProducts(prev => [newProduct, ...prev.slice(0, 4)]); // Keep list capped at 5

        // Show success message
        setShowSuccessMessage(true);
        
        // Reset form
        setFormData({
          name: '',
          description: '',
          price: '',
          image: '',
          ingredients: '',
          fullDescription: '',
          calories: '',
          protein: '',
          carbs: '',
          fat: '',
          category: ''
        });

        // Hide success message after 3 seconds
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      } else {
        throw new Error(response.data.message || 'Failed to add product');
      }
    } catch (err) {
      console.error('Error adding product:', err);
      // Use detailed error message from Axios response or local Error object
      setError(err.response?.data?.message || err.message || 'Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to view product details
  const viewProductDetails = (product) => {
    // Navigate to ProductDetailPage
    navigate(`/product/${product._id || product.id}`, { state: { product } });
  };

  // Check if user is admin (full-page guard)
  if (!user?.isAdmin) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <FaUserShield className="text-6xl text-red-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Access Denied</h1>
        <p className="text-gray-600">You need **administrator privileges** to access this page.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition shadow-md"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-orange-600 flex items-center justify-center gap-3">
        <FaPlusCircle /> Add New Product
      </h1>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 flex items-center gap-3">
          <FaTimesCircle className="text-xl" /> 
          **Error:** {error}
        </div>
      )}

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 flex items-center gap-3">
          <FaCheckCircle className="text-xl" />
          Product added successfully! View it in the menu or below.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Add Product Form (Col 1 & 2) */}
        <div className="bg-white rounded-lg shadow-xl p-8 lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">Product Information Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="name">Product Name <span className="text-red-500">*</span></label>
                  <input
                    type="text" id="name" name="name" value={formData.name} onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required disabled={loading}
                  />
                </div>

                {/* Category */}
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="category">Category <span className="text-red-500">*</span></label>
                  <select
                    name="category" value={formData.category} onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                    required disabled={loading}
                  >
                    <option value="">Select Category</option>
                    <option value="burgers">Burgers</option>
                    <option value="pizza">Pizza</option>
                    <option value="salads">Salads</option>
                    <option value="desserts">Desserts</option>
                    <option value="drinks">Drinks</option>
                    <option value="other">Other</option>
                  </select>
                </div>
            </div>

            {/* Price */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="price">Price ($) <span className="text-red-500">*</span></label>
              <input
                type="number" step="0.01" min="0.01" id="price" name="price" value={formData.price} onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                required disabled={loading}
              />
            </div>

            {/* Short Description */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="description">Short Description <span className="text-red-500">*</span></label>
              <input
                type="text" id="description" name="description" value={formData.description} onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                required disabled={loading} placeholder="A brief, appealing summary of the item."
              />
            </div>

            {/* Full Description */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="fullDescription">Full Description <span className="text-red-500">*</span></label>
              <textarea
                id="fullDescription" name="fullDescription" value={formData.fullDescription} onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                rows="4" required disabled={loading} placeholder="Detailed description, serving size, preparation method."
              />
            </div>
            
            {/* Ingredients */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="ingredients">Ingredients (comma separated)</label>
              <textarea
                id="ingredients" name="ingredients" value={formData.ingredients} onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                rows="3" disabled={loading} placeholder="beef, cheese, lettuce, tomato, special sauce"
              />
            </div>

            {/* Nutritional Info Section */}
            <h3 className="text-lg font-bold mb-4 text-gray-700">Nutritional Information (per serving)</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Calories */}
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="calories">Calories (kcal)</label>
                <input
                  type="number" id="calories" name="calories" value={formData.calories} onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  disabled={loading}
                />
              </div>
              {/* Protein */}
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="protein">Protein (e.g., 20g)</label>
                <input
                  type="text" id="protein" name="protein" value={formData.protein} onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  disabled={loading}
                />
              </div>
              {/* Carbs */}
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="carbs">Carbs (e.g., 45g)</label>
                <input
                  type="text" id="carbs" name="carbs" value={formData.carbs} onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  disabled={loading}
                />
              </div>
              {/* Fat */}
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="fat">Fat (e.g., 15g)</label>
                <input
                  type="text" id="fat" name="fat" value={formData.fat} onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Image URL */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="image">Image URL (Optional)</label>
              <input
                type="url" id="image" name="image" value={formData.image} onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="https://images.unsplash.com/photo-..." disabled={loading}
              />
              <p className="text-sm text-gray-500 mt-1">Leave empty to use a generic food image.</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-orange-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition duration-300 w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding Product...
                </>
              ) : (
                'Add Product to Menu'
              )}
            </button>
          </form>
        </div>

        {/* Recently Added Products (Col 3) */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">Recently Added</h2>
          
          {loading && addedProducts.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center border">
              <p className="text-gray-600">Loading recent products...</p>
            </div>
          ) : addedProducts.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center border-2 border-dashed border-gray-300">
              <p className="text-gray-600 font-medium">Menu is empty!</p>
              <p className="text-gray-500 text-sm mt-1">Add your first product using the form.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {addedProducts.map((product, index) => (
                <div key={product._id || product.id || index} className="bg-white rounded-lg shadow-md border border-gray-100 p-4 hover:shadow-lg transition duration-200">
                  <div className="flex items-start space-x-3">
                    <img 
                      src={product.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop'} 
                      alt={product.name} 
                      className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-md font-bold text-gray-800 truncate">{product.name}</h3>
                      <p className="text-sm text-orange-500 font-semibold mt-0.5">${product.price.toFixed(2)}</p>
                      {product.category && (
                        <span className="mt-1 inline-block px-2 py-0.5 text-xs font-medium bg-orange-100 text-orange-700 rounded-full">
                          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => viewProductDetails(product)}
                    className="mt-3 w-full text-center text-sm text-gray-600 py-1 border border-gray-200 rounded-md hover:bg-gray-100 transition"
                  >
                    View Product
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddProductPage;