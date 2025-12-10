import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function FoodCard({ id, name, image, description, price }) {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }
    
    const product = { 
      id, 
      name, 
      image, 
      description, 
      price: parseFloat(price) // Ensure price is a number
    };
    
    addToCart(product, 1);
    alert(`${name} added to cart!`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link to={`/product/${id}`}>
        <div className="h-48 overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/product/${id}`}>
          <h3 className="font-bold text-gray-800 text-lg mb-2 hover:text-orange-500">{name}</h3>
        </Link>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-orange-500 font-bold text-xl">${price}</span>
          <div className="flex gap-2">
            <Link 
              to={`/product/${id}`}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition duration-300"
            >
              View Details
            </Link>
            <button
              onClick={handleAddToCart}
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!user}
              title={!user ? "Login to add to cart" : "Add to cart"}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;