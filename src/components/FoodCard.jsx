import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../context/AuthContext';
import { FaHeart, FaRegHeart, FaSpinner, FaStar, FaShoppingCart, FaEye, FaTag, FaFire } from 'react-icons/fa';

function FoodCard({ 
  id, 
  name, 
  image, 
  description, 
  price, 
  isFeatured: initialIsFeatured, 
  category,
  rating,
  className = ''
}) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate(); 
  
  const [isFeatured, setIsFeatured] = useState(initialIsFeatured || false);
  const [loadingFeature, setLoadingFeature] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const product = { 
    id, 
    name, 
    image, 
    description, 
    price: parseFloat(price),
    category,
    isFeatured,
    rating 
  };
  
  const handleAddToCart = (e) => {
    // Stop propagation to prevent the click from triggering the main Link navigation
    e.preventDefault(); 
    e.stopPropagation();
    
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }
    
    addToCart(product, 1);
  };

  const handleToggleFeature = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user || !user.isAdmin) return;

    setLoadingFeature(true);
    const newFeaturedStatus = !isFeatured;

    try {
      const res = await api.put(`/products/feature/${id}`, { 
        isFeatured: newFeaturedStatus 
      });

      if (res.data.success) {
        setIsFeatured(newFeaturedStatus);
      } else {
        alert('Failed to update featured status.');
      }
    } catch (error) {
      console.error("Error toggling feature status:", error);
      alert('Error communicating with server to update feature status.');
    } finally {
      setLoadingFeature(false);
    }
  };
  
  const handleViewDetails = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/product/${id}`);
  }

  return (
    // --------------------------------------------------------------------------------------------------
    // 🛑 FIX START: Replaced the entire wrapping <Link> with a <div>.
    // The link functionality is now provided ONLY by the parent <Link> in MenuPage.jsx.
    // --------------------------------------------------------------------------------------------------
    <div 
      className={`
        group relative h-full flex flex-col rounded-2xl overflow-hidden 
        transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2
        bg-gradient-to-br from-white to-gray-50 border border-gray-200/50
        shadow-lg hover:shadow-2xl
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* 🛑 CONTENT WRAPPER: This was the redundant Link that caused the error. Now it's a simple <div>.
          The classes needed for styling are kept.
      */}
      <div 
        className="block h-full flex flex-col" // Keeping the original styling classes
      >

        {/* Featured Badge - Top Left */}
        {isFeatured && (
          <div className="absolute top-4 left-4 z-20">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-xl flex items-center gap-1.5">
              <FaFire className="w-3 h-3" />
              <span>FEATURED</span>
            </div>
          </div>
        )}

        {/* Category Badge - Top Right */}
        {category && (
          <div className="absolute top-4 right-4 z-20">
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-xl flex items-center gap-1.5">
              <FaTag className="w-3 h-3" />
              <span>{category.toUpperCase()}</span>
            </div>
          </div>
        )}

        {/* ADMIN FEATURE TOGGLE BUTTON - Must use a <button> and stop propagation */}
        {user && user.isAdmin && (
          <button
            onClick={handleToggleFeature}
            className={`absolute top-16 right-4 z-20 p-2.5 rounded-full shadow-xl
                       ${isFeatured ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-white/90 text-gray-700 hover:bg-white'} 
                       transition-all duration-300 disabled:opacity-50 backdrop-blur-sm
                       hover:scale-110`}
            disabled={loadingFeature}
            title={isFeatured ? "Remove from Featured" : "Add to Featured"}
          >
            {loadingFeature ? (
              <FaSpinner className="animate-spin w-4 h-4" />
            ) : isFeatured ? (
              <FaHeart className="w-4 h-4" />
            ) : (
              <FaRegHeart className="w-4 h-4" />
            )}
          </button>
        )}

        {/* Image Container */}
        <div className="relative h-56 md:h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          {/* Loading Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
          )}
          
          {/* Product Image */}
          <img 
            src={image} 
            alt={name} 
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110
                      ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Hover Overlay with Quick Actions */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center pb-8 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="bg-white text-gray-800 p-3.5 rounded-full hover:bg-green-500 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-lg"
                title="Add to cart"
              >
                <FaShoppingCart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col p-5">
          <h3 className="font-bold text-gray-900 text-xl mb-3 group-hover:text-orange-600 transition-colors duration-300 line-clamp-1 tracking-tight">
            {name}
          </h3>
          
          {/* Price Section */}
          <div className="mb-5">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900 tracking-tight">
                ${typeof price === 'number' ? price.toFixed(2) : price}
              </span>
            </div>
          </div>

          {rating && (
            <div className="mb-5">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-700 ml-1">{rating.toFixed(1)}</span>
                <span className="text-xs text-gray-500">/5.0</span>
              </div>
            </div>
          )}
        </div>
      </div> 
      {/* 🛑 CONTENT WRAPPER closes here (It is now a div, not a Link) */}
      
      {/* FINAL Action Buttons - These buttons are correctly placed outside the wrapper. */}
      <div className="p-5 pt-0 flex gap-3 mt-auto"> 
        
        <button
          onClick={handleViewDetails} 
          className="flex-1 bg-gradient-to-r from-gray-400 to-gray-800 text-white px-4 py-3.5 rounded-xl hover:from-gray-900 hover:to-black transition-all duration-300 font-medium text-center group/view shadow-md"
        >
          <span className="flex items-center justify-center gap-2.5">
            <FaEye className="w-4.5 h-4.5" />
            View Details
          </span>
        </button>
        
        <button
          onClick={handleAddToCart}
          className={`flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-3.5 rounded-xl font-medium transition-all duration-300 
                    ${!user ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl hover:shadow-orange-500/30 hover:from-orange-600 hover:to-amber-600'} 
                    group/cart flex items-center justify-center gap-2.5 shadow-md`}
          disabled={!user}
          title={!user ? "Login to add to cart" : "Add to cart"}
        >
          <FaShoppingCart className="w-4.5 h-4.5" />
          Add to Cart
        </button>
      </div>

    </div>
  );
}

export default FoodCard;