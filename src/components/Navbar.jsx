import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaPlus, FaSignOutAlt, FaBars, FaTimes, FaSpinner } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, loading: authLoading } = useAuth();
  const { getCartCount, loading: cartLoading } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const isActive = (path) => {
    return location.pathname === path ? 'text-orange-500 font-semibold' : 'text-gray-700 hover:text-orange-500';
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
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-orange-600">
            Foody-Ham
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`${isActive('/')} transition duration-300`}>
              Home
            </Link>
            <Link to="/menu" className={`${isActive('/menu')} transition duration-300`}>
              Menu
            </Link>
            {user?.isAdmin && (
              <Link to="/add-product" className={`${isActive('/add-product')} transition duration-300 flex items-center gap-1`}>
                <FaPlus /> Add Product
              </Link>
            )}
            <Link to="/about" className={`${isActive('/about')} transition duration-300`}>
              About
            </Link>
            <Link to="/contact" className={`${isActive('/contact')} transition duration-300`}>
              Contact
            </Link>
          </div>
          

          {/* User Actions */}
          <div className="flex items-center space-x-6">
            {/* Cart Icon */}
            <Link to="/cart" className="relative">
              <FaShoppingCart className="text-xl text-gray-600 hover:text-orange-500 cursor-pointer transition duration-300" />
              {/* Cart badge - Show actual count or loading */}
              {cartLoading ? (
                <span className="absolute -top-2 -right-2 bg-gray-300 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  <FaSpinner className="animate-spin" size={10} />
                </span>
              ) : showCartBadge ? (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              ) : null}
            </Link>

            {/* User Dropdown */}
            {authLoading ? (
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <FaSpinner className="animate-spin text-gray-400" size={16} />
              </div>
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-orange-500"
                  disabled={authLoading}
                >
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <FaUser className="text-orange-500" />
                  </div>
                  <span className="hidden md:inline">{user.name}</span>
                  {user.isAdmin && (
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded hidden md:inline">
                      Admin
                    </span>
                  )}
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b">
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                      {user.isAdmin && (
                        <span className="text-xs text-orange-500">Administrator</span>
                      )}
                    </div>
                    {user.isAdmin && (
                      <Link
                        to="/admin/products"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => { setShowDropdown(false); setIsMenuOpen(false); }}
                      >
                        Manage Products
                      </Link>
                    )}
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => { setShowDropdown(false); setIsMenuOpen(false); }}
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500 flex items-center gap-2"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition duration-300"
              >
                Login
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-600 hover:text-orange-500"
              disabled={authLoading}
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col space-y-3">
              <Link to="/" className={`${isActive('/')} py-2`} onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link to="/menu" className={`${isActive('/menu')} py-2`} onClick={() => setIsMenuOpen(false)}>
                Menu
              </Link>
              {user?.isAdmin && (
                <Link to="/add-product" className={`${isActive('/add-product')} py-2`} onClick={() => setIsMenuOpen(false)}>
                  Add Product
                </Link>
              )}
              <Link to="/about" className={`${isActive('/about')} py-2`} onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
              <Link to="/contact" className={`${isActive('/contact')} py-2`} onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
              <Link to="/cart" className={`${isActive('/cart')} py-2 flex items-center`} onClick={() => setIsMenuOpen(false)}>
                Cart {!cartLoading && cartCount > 0 && `(${cartCount})`}
                {cartLoading && <FaSpinner className="animate-spin ml-2" size={14} />}
              </Link>
              {!user && !authLoading && (
                <Link to="/login" className="text-orange-500 py-2" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
              )}
              {authLoading && (
                <div className="py-2 text-gray-500 flex items-center">
                  <FaSpinner className="animate-spin mr-2" /> Loading...
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