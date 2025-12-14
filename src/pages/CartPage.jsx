import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FaTrash, FaPlus, FaMinus, FaShoppingCart, FaCreditCard, FaSpinner } from 'react-icons/fa';

function CartPage() {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartTotal 
  } = useCart();
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      alert('Please login to checkout');
      navigate('/login', { state: { from: '/cart' } });
      return;
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Check if token exists
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Not authenticated. Please login again.');
      }

      // Prepare order data
      const orderData = {
        items: cartItems.map(item => ({
          product: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        totalAmount: getCartTotal() + 5 + (getCartTotal() * 0.08),
        shippingAddress: user.address || '',
        paymentMethod: 'credit_card'
      };

      // Create order using fetch instead of axios
      const response = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        setCheckoutSuccess(true);
        clearCart();
        
        // Show success for 5 seconds then redirect
        setTimeout(() => {
          setCheckoutSuccess(false);
          navigate('/');
        }, 5000);
      } else {
        throw new Error(data.message || 'Checkout failed');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      
      if (err.message.includes('Not authenticated') || err.message.includes('401')) {
        // Clear invalid token and redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setError('Session expired. Please login again.');
        setTimeout(() => {
          navigate('/login', { state: { from: '/cart' } });
        }, 2000);
      } else {
        setError(err.message || 'Checkout failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (checkoutSuccess) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="text-green-500 text-6xl mb-4">✓</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your order. You will receive a confirmation email shortly.
          </p>
          <p className="text-gray-500 mb-8">
            Redirecting to homepage in 5 seconds...
          </p>
          <Link
            to="/"
            className="bg-orange-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition duration-300 inline-block"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-md mx-auto">
          <FaShoppingCart className="text-6xl text-gray-300 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add some delicious items from our menu!</p>
          <Link
            to="/menu"
            className="bg-orange-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition duration-300 inline-block"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  const shippingFee = 5.00;
  const taxRate = 0.08;
  const taxAmount = getCartTotal() * taxRate;
  const totalAmount = getCartTotal() + shippingFee + taxAmount;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cartItems.map(item => (
            <div key={`${item.id}-${item.name}`} className="bg-white rounded-lg shadow-md p-6 mb-4">
              <div className="flex items-start space-x-4">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                      <p className="text-gray-600 text-sm mt-1 line-clamp-1">{item.description}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-600 ml-2"
                      title="Remove item"
                      disabled={loading}
                    >
                      <FaTrash />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
                        title="Decrease quantity"
                        disabled={loading || item.quantity <= 1}
                      >
                        <FaMinus />
                      </button>
                      <span className="text-lg font-semibold w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
                        title="Increase quantity"
                        disabled={loading}
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-orange-500">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      <div className="text-gray-500 text-sm">
                        ${item.price.toFixed(2)} each
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={clearCart}
            className="text-red-500 hover:text-red-600 flex items-center gap-2 mt-4 disabled:opacity-50"
            disabled={loading}
          >
            <FaTrash /> Clear Cart
          </button>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                <span className="font-semibold">${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">${shippingFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (8%)</span>
                <span className="font-semibold">${taxAmount.toFixed(2)}</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-orange-500">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <button 
              onClick={handleCheckout}
              disabled={loading || !user}
              className="w-full bg-orange-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition duration-300 mb-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" /> Processing...
                </>
              ) : (
                <>
                  <FaCreditCard /> {!user ? 'Login to Checkout' : 'Proceed to Checkout'}
                </>
              )}
            </button>

            <Link
              to="/menu"
              className="w-full text-center block bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition duration-300 disabled:opacity-50"
            >
              Continue Shopping
            </Link>
            
            <div className="mt-4 text-sm text-gray-500">
              <p className="mb-1">• Free delivery on orders over $50</p>
              <p className="mb-1">• Estimated delivery: 30-45 minutes</p>
              <p>• Secure payment processing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;