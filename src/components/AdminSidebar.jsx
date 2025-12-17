import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaUser, FaSignOutAlt, FaTimes } from 'react-icons/fa';

function AdminSidebar({ isOpen, onClose, user, onLogout }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40" 
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center">
              <FaUser className="text-orange-500 text-xl" />
            </div>
            <div>
              <p className="font-bold text-gray-900">{user?.name}</p>
              <p className="text-sm text-gray-600">Administrator</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FaTimes className="text-gray-500" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="p-4 space-y-2">
          <Link
            to="/admin/products"
            className="flex items-center gap-3 p-4 hover:bg-orange-50 rounded-xl transition-colors group"
            onClick={onClose}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center group-hover:from-blue-100 group-hover:to-blue-200">
              <FaPlus className="text-blue-500" />
            </div>
            <span className="font-medium text-gray-700">Manage Products</span>
          </Link>
          
          <Link
            to="/admin/analytics"
            className="flex items-center gap-3 p-4 hover:bg-orange-50 rounded-xl transition-colors group"
            onClick={onClose}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg flex items-center justify-center group-hover:from-purple-100 group-hover:to-purple-200">
              <span className="text-purple-500 text-lg">📊</span>
            </div>
            <span className="font-medium text-gray-700">Analytics</span>
          </Link>
          
          <Link
            to="/admin/coupons"
            className="flex items-center gap-3 p-4 hover:bg-orange-50 rounded-xl transition-colors group"
            onClick={onClose}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-green-50 to-green-100 rounded-lg flex items-center justify-center group-hover:from-green-100 group-hover:to-green-200">
              <span className="text-green-500 text-lg">🎫</span>
            </div>
            <span className="font-medium text-gray-700">Coupons</span>
          </Link>
          
          <Link
            to="/admin/orders"
            className="flex items-center gap-3 p-4 hover:bg-orange-50 rounded-xl transition-colors group"
            onClick={onClose}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg flex items-center justify-center group-hover:from-indigo-100 group-hover:to-indigo-200">
              <span className="text-indigo-500 text-lg">📦</span>
            </div>
            <span className="font-medium text-gray-700">Orders</span>
          </Link>
          
          <Link
            to="/admin/reservations"
            className="flex items-center gap-3 p-4 hover:bg-orange-50 rounded-xl transition-colors group"
            onClick={onClose}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg flex items-center justify-center group-hover:from-yellow-100 group-hover:to-yellow-200">
              <span className="text-yellow-500 text-lg">🍽️</span>
            </div>
            <span className="font-medium text-gray-700">Reservations</span>
          </Link>
          
          <Link
            to="/admin/promotions"
            className="flex items-center gap-3 p-4 hover:bg-orange-50 rounded-xl transition-colors group"
            onClick={onClose}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg flex items-center justify-center group-hover:from-pink-100 group-hover:to-pink-200">
              <span className="text-pink-500 text-lg">🎉</span>
            </div>
            <span className="font-medium text-gray-700">Promotions</span>
          </Link>
          
          <div className="border-t border-gray-200 my-4"></div>
          
          <Link
            to="/profile"
            className="flex items-center gap-3 p-4 hover:bg-orange-50 rounded-xl transition-colors group"
            onClick={onClose}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-green-50 to-green-100 rounded-lg flex items-center justify-center group-hover:from-green-100 group-hover:to-green-200">
              <FaUser className="text-green-500" />
            </div>
            <span className="font-medium text-gray-700">My Profile</span>
          </Link>
          
          <Link
            to="/orders"
            className="flex items-center gap-3 p-4 hover:bg-orange-50 rounded-xl transition-colors group"
            onClick={onClose}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center group-hover:from-blue-100 group-hover:to-blue-200">
              <span className="text-blue-500 text-lg">📋</span>
            </div>
            <span className="font-medium text-gray-700">My Orders</span>
          </Link>
          
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="w-full flex items-center gap-3 p-4 hover:bg-red-50 rounded-xl transition-colors group text-left"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-red-50 to-red-100 rounded-lg flex items-center justify-center group-hover:from-red-100 group-hover:to-red-200">
              <FaSignOutAlt className="text-red-500" />
            </div>
            <span className="font-medium text-red-600">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default AdminSidebar;