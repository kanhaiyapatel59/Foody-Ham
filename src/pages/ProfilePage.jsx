import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaSave, FaLock } from 'react-icons/fa';

function ProfilePage() {
  const { user, updateProfile, changePassword } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Initialize form data when user loads
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setMessage('');
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
    setError('');
    setMessage('');
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      await updateProfile(formData);
      setMessage('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Validate passwords match
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    // Validate password length
    if (passwordData.newPassword.length < 6) {
      setError('New password must be at least 6 characters');
      return;
    }

    try {
      await changePassword(passwordData.currentPassword, passwordData.newPassword);
      setMessage('Password changed successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setIsChangingPassword(false);
    } catch (err) {
      setError(err.message || 'Failed to change password');
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Please Login</h1>
        <p className="text-gray-600 mb-8">You need to be logged in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
          {!isEditing && !isChangingPassword && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition flex items-center gap-2"
            >
              <FaEdit /> Edit Profile
            </button>
          )}
        </div>

        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Profile Information */}
        {!isEditing && !isChangingPassword ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                  <FaUser className="text-3xl text-orange-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                  <p className="text-gray-600">{user.email}</p>
                  {user.isAdmin && (
                    <span className="inline-block mt-2 bg-orange-500 text-white text-sm px-3 py-1 rounded">
                      Administrator
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <FaEnvelope className="text-gray-400 mr-3" />
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="font-medium">{user.email}</div>
                  </div>
                </div>

                {user.phone && (
                  <div className="flex items-center">
                    <FaPhone className="text-gray-400 mr-3" />
                    <div>
                      <div className="text-sm text-gray-500">Phone</div>
                      <div className="font-medium">{user.phone}</div>
                    </div>
                  </div>
                )}

                {user.address && (
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-gray-400 mr-3" />
                    <div>
                      <div className="text-sm text-gray-500">Address</div>
                      <div className="font-medium">{user.address}</div>
                    </div>
                  </div>
                )}

                <div className="pt-4">
                  <button
                    onClick={() => setIsChangingPassword(true)}
                    className="text-orange-500 hover:text-orange-600 flex items-center gap-2"
                  >
                    <FaLock /> Change Password
                  </button>
                </div>
              </div>
            </div>

            {/* Account Info */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Account Information</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Account Type</h4>
                  <p className="text-gray-600">
                    {user.isAdmin ? 'Administrator Account' : 'Regular User Account'}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Member Since</h4>
                  <p className="text-gray-600">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Account Status</h4>
                  <span className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : isEditing ? (
          /* Edit Profile Form */
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h2>
            
            <form onSubmit={handleSaveProfile}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 mb-2">Full Name</label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-10 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Phone Number</label>
                  <div className="relative">
                    <FaPhone className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Address</label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full pl-10 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition flex items-center gap-2"
                >
                  <FaSave /> Save Changes
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Change Password Form */
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Change Password</h2>
            
            <form onSubmit={handleChangePassword}>
              <div className="space-y-6 mb-6">
                <div>
                  <label className="block text-gray-700 mb-2">Current Password</label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full pl-10 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">New Password</label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full pl-10 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Must be at least 6 characters long</p>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Confirm New Password</label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full pl-10 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsChangingPassword(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition flex items-center gap-2"
                >
                  <FaLock /> Change Password
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;