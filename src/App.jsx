import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AddProductPage from './pages/AddProductPage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import AdminProductsPage from './pages/AdminProductsPage';
import ProfilePage from './pages/ProfilePage'; // Add this import
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Public routes without layout */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* Routes with layout */}
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="menu" element={<MenuPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="product/:id" element={<ProductDetailPage />} />
              <Route path="product/custom-:id" element={<ProductDetailPage />} />
              
              {/* Protected routes */}
              <Route path="cart" element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              } />
              
              <Route path="profile" element={ // Add this route
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } />
              
              <Route path="add-product" element={
                <ProtectedRoute requireAdmin>
                  <AddProductPage />
                </ProtectedRoute>
              } />
              
              <Route path="admin/products" element={
                <ProtectedRoute requireAdmin>
                  <AdminProductsPage />
                </ProtectedRoute>
              } />
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;