import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// Removed FaCommentDots from import
import { FaShoppingCart, FaUser, FaPlus, FaSignOutAlt, FaBars, FaTimes, FaSpinner, FaHome, FaUtensils, FaInfoCircle, FaEnvelope, FaCrown, FaHeart } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  // Ensure useAuth has been imported correctly (it is)
  const { user, logout, loading: authLoading } = useAuth();
  const { getCartCount, loading: cartLoading } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll for navbar effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    return location.pathname === path 
      ? 'text-orange-500 font-semibold border-b-2 border-orange-500' 
      : 'text-gray-700 hover:text-orange-500 transition-colors duration-300';
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowDropdown(false);
    setIsMenuOpen(false);
  };

  // Get cart count or show loading
  const cartCount = getCartCount();
  const showCartBadge = cartCount > 0;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-2xl py-2 border-b border-gray-100' 
        : 'bg-gradient-to-r from-white to-orange-50 py-3 shadow-lg'
    }`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo with Enhanced Design */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <span className="text-white font-bold text-xl">FH</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Foody-Ham
              </span>
              <span className="text-xs text-gray-500 font-medium">Savor the Excellence</span>
            </div>
          </Link>

          {/* Desktop Navigation with Enhanced Design */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link 
              to="/" 
              className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-300 ${isActive('/')}`}
            >
              <FaHome className="text-lg" />
              <span className="font-medium">Home</span>
            </Link>
            
            <Link 
              to="/menu" 
              className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-300 ${isActive('/menu')}`}
            >
              <FaUtensils className="text-lg" />
              <span className="font-medium">Menu</span>
            </Link>
            
            {user?.isAdmin && (
              <Link 
                to="/add-product" 
                className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-300 ${isActive('/add-product')}`}
              >
                <FaPlus className="text-lg" />
                <span className="font-medium">Add Product</span>
              </Link>
            )}
            
            <Link 
              to="/about" 
              className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-300 ${isActive('/about')}`}
            >
              <FaInfoCircle className="text-lg" />
              <span className="font-medium">About</span>
            </Link>
            
            {/* REMOVED: Desktop Feedback Link */}
            {/* Removed the following block:
            <Link 
              to="/feedback" 
              className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-300 ${isActive('/feedback')}`}
            >
              <FaCommentDots className="text-lg" />
              <span className="font-medium">Feedback</span>
            </Link>
            */}

            <Link 
              to="/contact" 
              className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-300 ${isActive('/contact')}`}
            >
              <FaEnvelope className="text-lg" />
              <span className="font-medium">Contact</span>
            </Link>
          </div>

          {/* User Actions with Enhanced Design */}
          <div className="flex items-center space-x-4 lg:space-x-6">
            {/* Wishlist Icon */}
            <Link to="/wishlist" className="relative group">
              <div className="p-2.5 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
                <FaHeart className={`text-xl transition-colors duration-300 ${
                  location.pathname === '/wishlist' ? 'text-red-500' : 'text-gray-600 group-hover:text-red-500'
                }`} />
              </div>
            </Link>

            {/* Cart Icon with Enhanced Badge */}
            <Link to="/cart" className="relative group">
              <div className="p-2.5 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
                <FaShoppingCart className={`text-xl transition-colors duration-300 ${
                  location.pathname === '/cart' ? 'text-orange-500' : 'text-gray-600 group-hover:text-orange-500'
                }`} />
              </div>
              
              {/* Enhanced Cart Badge */}
              {cartLoading ? (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-gray-400 to-gray-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center shadow-md">
                  <FaSpinner className="animate-spin" size={10} />
                </span>
              ) : showCartBadge ? (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-pulse">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              ) : null}
            </Link>

            {/* Enhanced User Dropdown */}
            {authLoading ? (
              <div className="p-2.5 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-md border border-gray-100">
                <FaSpinner className="animate-spin text-gray-400" size={20} />
              </div>
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-3 group"
                  disabled={authLoading}
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                      <FaUser className="text-orange-500 text-lg" />
                    </div>
                    {user.isAdmin && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full flex items-center justify-center">
                        <FaCrown className="text-white text-xs" />
                      </div>
                    )}
                  </div>
                  
                  <div className="hidden lg:flex flex-col items-start">
                    <span className="font-semibold text-gray-800">{user.name}</span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      {user.isAdmin ? (
                        <>
                          <FaCrown className="text-amber-500" />
                          Administrator
                        </>
                      ) : (
                        'Member'
                      )}
                    </span>
                  </div>
                </button>

                {/* Enhanced Dropdown Menu */}
                {showDropdown && (
                  <>
                    {/* Backdrop */}
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowDropdown(false)}
                    />
                    
                    <div className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl py-3 z-50 border border-gray-200/50">
                      {/* User Info Section */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center">
                            <FaUser className="text-orange-500 text-xl" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                          </div>
                        </div>
                        {user.isAdmin && (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-amber-50 to-orange-50 rounded-full border border-amber-200">
                            <FaCrown className="text-amber-500 text-xs" />
                            <span className="text-xs font-semibold text-amber-700">Administrator</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Menu Items */}
                      <div className="py-2">
                        {user.isAdmin && (
                          <>
                            <Link
                              to="/admin/products"
                              className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50/50 transition-colors duration-200 group"
                              onClick={() => { setShowDropdown(false); setIsMenuOpen(false); }}
                            >
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center group-hover:from-blue-100 group-hover:to-blue-200">
                                <FaPlus className="text-blue-500" />
                              </div>
                              <span className="font-medium text-gray-700">Manage Products</span>
                            </Link>
                            
                            <Link
                              to="/admin/analytics"
                              className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50/50 transition-colors duration-200 group"
                              onClick={() => { setShowDropdown(false); setIsMenuOpen(false); }}
                            >
                              <div className="w-8 h-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg flex items-center justify-center group-hover:from-purple-100 group-hover:to-purple-200">
                                <span className="text-purple-500 text-sm font-bold">📊</span>
                              </div>
                              <span className="font-medium text-gray-700">Analytics</span>
                            </Link>
                            
                            <Link
                              to="/admin/coupons"
                              className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50/50 transition-colors duration-200 group"
                              onClick={() => { setShowDropdown(false); setIsMenuOpen(false); }}
                            >
                              <div className="w-8 h-8 bg-gradient-to-br from-green-50 to-green-100 rounded-lg flex items-center justify-center group-hover:from-green-100 group-hover:to-green-200">
                                <span className="text-green-500 text-sm font-bold">🎫</span>
                              </div>
                              <span className="font-medium text-gray-700">Coupons</span>
                            </Link>
                            
                            <Link
                              to="/admin/orders"
                              className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50/50 transition-colors duration-200 group"
                              onClick={() => { setShowDropdown(false); setIsMenuOpen(false); }}
                            >
                              <div className="w-8 h-8 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg flex items-center justify-center group-hover:from-indigo-100 group-hover:to-indigo-200">
                                <span className="text-indigo-500 text-sm font-bold">📦</span>
                              </div>
                              <span className="font-medium text-gray-700">Orders</span>
                            </Link>
                          </>
                        )}
                        
                        <Link
                          to="/profile"
                          className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50/50 transition-colors duration-200 group"
                          onClick={() => { setShowDropdown(false); setIsMenuOpen(false); }}
                        >
                          <div className="w-8 h-8 bg-gradient-to-br from-green-50 to-green-100 rounded-lg flex items-center justify-center group-hover:from-green-100 group-hover:to-green-200">
                            <FaUser className="text-green-500" />
                          </div>
                          <span className="font-medium text-gray-700">My Profile</span>
                        </Link>
                        
                        <Link
                          to="/orders"
                          className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50/50 transition-colors duration-200 group"
                          onClick={() => { setShowDropdown(false); setIsMenuOpen(false); }}
                        >
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center group-hover:from-blue-100 group-hover:to-blue-200">
                            <span className="text-blue-500 text-sm font-bold">📋</span>
                          </div>
                          <span className="font-medium text-gray-700">My Orders</span>
                        </Link>
                        
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50/50 transition-colors duration-200 group text-left"
                        >
                          <div className="w-8 h-8 bg-gradient-to-br from-red-50 to-red-100 rounded-lg flex items-center justify-center group-hover:from-red-100 group-hover:to-red-200">
                            <FaSignOutAlt className="text-red-500" />
                          </div>
                          <span className="font-medium text-red-600">Logout</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden lg:inline-block bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-xl hover:shadow-orange-500/25 hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-md"
              >
                Login
              </Link>
            )}

            {/* Enhanced Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2.5 rounded-xl transition-all duration-300 ${
                isMenuOpen 
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white' 
                  : 'bg-gradient-to-br from-gray-50 to-white shadow-md hover:shadow-lg'
              }`}
              disabled={authLoading}
            >
              {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-6 pt-4 border-t border-gray-200/50">
            <div className="grid gap-1">
              <Link 
                to="/" 
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${isActive('/')}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <FaHome className="text-lg" />
                <span className="font-medium">Home</span>
              </Link>
              
              <Link 
                to="/menu" 
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${isActive('/menu')}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <FaUtensils className="text-lg" />
                <span className="font-medium">Menu</span>
              </Link>
              
              {user?.isAdmin && (
                <Link 
                  to="/add-product" 
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${isActive('/add-product')}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaPlus className="text-lg" />
                  <span className="font-medium">Add Product</span>
                </Link>
              )}
              
              <Link 
                to="/about" 
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${isActive('/about')}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <FaInfoCircle className="text-lg" />
                <span className="font-medium">About</span>
              </Link>
              
              {/* REMOVED: Mobile Feedback Link */}
              {/* Removed the following block:
              <Link 
                to="/feedback" 
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${isActive('/feedback')}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <FaCommentDots className="text-lg" />
                <span className="font-medium">Feedback</span>
              </Link>
              */}

              <Link 
                to="/contact" 
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${isActive('/contact')}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <FaEnvelope className="text-lg" />
                <span className="font-medium">Contact</span>
              </Link>
              
              <Link 
                to="/wishlist" 
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${isActive('/wishlist')}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <FaHeart className="text-lg" />
                <span className="font-medium">Wishlist</span>
              </Link>
              
              <Link 
                to="/cart" 
                className="flex items-center justify-between px-4 py-3.5 rounded-xl bg-gradient-to-r from-gray-50 to-white shadow-inner border border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <FaShoppingCart className="text-lg text-gray-600" />
                  <span className="font-medium">Cart</span>
                </div>
                {!cartLoading && cartCount > 0 && (
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
                {cartLoading && <FaSpinner className="animate-spin" size={16} />}
              </Link>
              
              {!user && !authLoading && (
                <Link 
                  to="/login" 
                  className="mt-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-3.5 rounded-xl font-semibold text-center hover:shadow-lg transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
              
              {authLoading && (
                <div className="px-4 py-3.5 text-gray-500 flex items-center justify-center gap-2">
                  <FaSpinner className="animate-spin" /> Loading...
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;