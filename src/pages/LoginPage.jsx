import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaLock, FaEnvelope, FaExclamationTriangle, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [localError, setLocalError] = useState(''); // Local error for validation
  const [loading, setLoading] = useState(false);

  // Get authentication functions and error state from context
  const { login, register, error: authError, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine where to navigate after successful authentication
  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setLocalError('');
    clearError(); // Clear auth context error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    clearError();
    setLoading(true);

    try {
      if (isLogin) {
        // --- LOGIN LOGIC ---
        if (!formData.email || !formData.password) {
            throw new Error('Email and password are required.');
        }
        await login(formData.email, formData.password);
        navigate(from, { replace: true });

      } else {
        // --- REGISTRATION LOGIC ---
        // Client-side validation
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            throw new Error('All fields are required for registration.');
        }
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        if (formData.password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }
        
        await register(formData.name, formData.email, formData.password);
        navigate(from, { replace: true });
      }
    } catch (err) {
      // Catch errors thrown by validation or by the context functions (API errors)
      setLocalError(err.message || 'Something went wrong during authentication.');
    } finally {
      setLoading(false);
    }
  };

  // Combine local errors with auth context errors for display
  const displayError = localError || authError;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
        <div>
          <h2 className="text-3xl font-extrabold text-center text-orange-600 flex items-center justify-center gap-2">
            {isLogin ? <FaSignInAlt /> : <FaUserPlus />}
            {isLogin ? 'Welcome Back' : 'Join Foody-Ham'}
          </h2>
          <p className="mt-2 text-center text-gray-500">
            {isLogin ? 'Sign in to place your order' : 'Create an account to get started'}
          </p>
        </div>

        {displayError && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 flex items-center gap-3 rounded">
            <FaExclamationTriangle className="text-xl flex-shrink-0" />
            <span className="font-medium">{displayError}</span>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Full Name</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                  required={!isLogin}
                  disabled={loading}
                  placeholder="Your Name"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Email Address</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                required
                disabled={loading}
                placeholder="example@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                required
                disabled={loading}
                placeholder="Password (min 6 characters)"
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Confirm Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                  required={!isLogin}
                  disabled={loading}
                  placeholder="Confirm Password"
                />
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition duration-300 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
            </button>
          </div>
        </form>

        <div className="text-center pt-4 border-t border-gray-100">
          <button
            onClick={() => {
              // Toggle state and reset form/errors
              setIsLogin(!isLogin);
              setLocalError('');
              clearError();
              setFormData({
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
              });
            }}
            className="text-orange-500 font-medium hover:text-orange-600 transition"
            disabled={loading}
          >
            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
          </button>
        </div>

        <div className="text-center text-sm text-gray-500 mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 gap-3 bg-gray-50 p-4 rounded-lg">
            <div className="text-left">
              <p className="font-semibold mb-1 text-gray-700">Demo Admin Account:</p>
              <p>Email: <code className="bg-gray-200 px-1 rounded">admin@foodyham.com</code></p>
              <p>Password: <code className="bg-gray-200 px-1 rounded">admin123</code></p>
            </div>
          </div>
          <p className="mt-4 text-gray-600">You can also create a regular customer account above.</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;