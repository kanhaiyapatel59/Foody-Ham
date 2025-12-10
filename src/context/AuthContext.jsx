import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Admin credentials (hardcoded for demo)
  const ADMIN_EMAIL = 'admin@foodyham.com';
  const ADMIN_PASSWORD = 'admin123';

  // Initialize with some demo users for testing
  useEffect(() => {
    // Initialize localStorage with some demo users if empty
    const existingUsers = JSON.parse(localStorage.getItem('foodyham_users'));
    if (!existingUsers) {
      const demoUsers = [
        {
          id: 'user-1',
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
          createdAt: new Date().toISOString()
        },
        {
          id: 'user-2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          password: 'password123',
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem('foodyham_users', JSON.stringify(demoUsers));
    }

    // Check if user is logged in on app load
    const storedUser = localStorage.getItem('foodyham_user');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    setLoading(false);
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if admin
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
          const adminUser = {
            id: 'admin-1',
            email: ADMIN_EMAIL,
            name: 'Admin',
            role: 'admin',
            isAdmin: true
          };
          setUser(adminUser);
          localStorage.setItem('foodyham_user', JSON.stringify(adminUser));
          resolve(adminUser);
          return;
        } 
        
        // Check regular users
        const users = JSON.parse(localStorage.getItem('foodyham_users') || '[]');
        const foundUser = users.find(u => u.email === email && u.password === password);
        
        if (foundUser) {
          const userData = {
            id: foundUser.id,
            email: foundUser.email,
            name: foundUser.name,
            role: 'user',
            isAdmin: false
          };
          setUser(userData);
          localStorage.setItem('foodyham_user', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('Invalid email or password. Please register first.'));
        }
      }, 500);
    });
  };

  const register = (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('foodyham_users') || '[]');
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          reject(new Error('Please enter a valid email address'));
          return;
        }

        // Check if user already exists
        if (users.some(u => u.email === email)) {
          reject(new Error('User already exists with this email'));
          return;
        }

        // Validate password length
        if (password.length < 6) {
          reject(new Error('Password must be at least 6 characters long'));
          return;
        }

        const newUser = {
          id: `user-${Date.now()}`,
          name,
          email,
          password, // In real app, hash this!
          createdAt: new Date().toISOString(),
          address: '',
          phone: '',
          preferences: []
        };

        users.push(newUser);
        localStorage.setItem('foodyham_users', JSON.stringify(users));

        // Auto login after registration
        const userData = {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: 'user',
          isAdmin: false
        };
        
        setUser(userData);
        localStorage.setItem('foodyham_user', JSON.stringify(userData));
        resolve(userData);
      }, 500);
    });
  };

  const updateProfile = (updates) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const users = JSON.parse(localStorage.getItem('foodyham_users') || '[]');
          const updatedUsers = users.map(u => 
            u.id === user.id ? { ...u, ...updates } : u
          );
          
          localStorage.setItem('foodyham_users', JSON.stringify(updatedUsers));
          
          // Update current user
          const updatedUser = { ...user, ...updates };
          setUser(updatedUser);
          localStorage.setItem('foodyham_user', JSON.stringify(updatedUser));
          
          resolve(updatedUser);
        } catch (error) {
          reject(new Error('Failed to update profile'));
        }
      }, 500);
    });
  };

  const changePassword = (currentPassword, newPassword) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('foodyham_users') || '[]');
        const userIndex = users.findIndex(u => u.id === user.id);
        
        if (userIndex === -1) {
          reject(new Error('User not found'));
          return;
        }
        
        // Check current password
        if (users[userIndex].password !== currentPassword) {
          reject(new Error('Current password is incorrect'));
          return;
        }
        
        // Validate new password
        if (newPassword.length < 6) {
          reject(new Error('New password must be at least 6 characters'));
          return;
        }
        
        // Update password
        users[userIndex].password = newPassword;
        localStorage.setItem('foodyham_users', JSON.stringify(users));
        
        resolve({ message: 'Password updated successfully' });
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('foodyham_user');
  };

  const value = {
    user,
    login,
    register,
    updateProfile,
    changePassword,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};