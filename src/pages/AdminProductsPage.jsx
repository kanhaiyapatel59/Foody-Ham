import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaEdit, FaTrash, FaEye, FaPlus, FaSpinner } from 'react-icons/fa';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [error, setError] = useState('');

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get('/products');
      if (res.data.success) {
        setProducts(res.data.data);
      }
    } catch (err) {
      setError('Failed to load products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/products/${productToDelete._id}`);
      setProducts(prev => prev.filter(p => p._id !== productToDelete._id));
      setShowDeleteModal(false);
      setProductToDelete(null);
    } catch (err) {
      setError('Failed to delete product');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category || 'other',
      image: product.image || '',
      ingredients: Array.isArray(product.ingredients) ? product.ingredients.join(', ') : '',
      fullDescription: product.fullDescription || product.description,
      calories: product.nutritionalInfo?.calories || '',
      protein: product.nutritionalInfo?.protein || '',
      carbs: product.nutritionalInfo?.carbs || '',
      fat: product.nutritionalInfo?.fat || ''
    });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const saveEdit = async () => {
    try {
      const productData = {
        name: editForm.name,
        description: editForm.description,
        price: parseFloat(editForm.price),
        category: editForm.category,
        image: editForm.image || undefined,
        ingredients: editForm.ingredients.split(',').map(i => i.trim()).filter(i => i),
        fullDescription: editForm.fullDescription,
        nutritionalInfo: {
          calories: parseInt(editForm.calories) || 0,
          protein: editForm.protein || "0g",
          carbs: editForm.carbs || "0g",
          fat: editForm.fat || "0g"
        }
      };

      const res = await api.put(`/products/${editingProduct._id}`, productData);
      if (res.data.success) {
        setProducts(prev => prev.map(p => 
          p._id === editingProduct._id ? { ...p, ...res.data.data } : p
        ));
        setShowEditModal(false);
        setEditingProduct(null);
      }
    } catch (err) {
      setError('Failed to update product');
    }
  };

  const viewProduct = (product) => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  const getCategoryStats = () => {
    const stats = {};
    products.forEach(p => {
      const cat = p.category || 'other';
      stats[cat] = (stats[cat] || 0) + 1;
    });
    return stats;
  };

  if (!user?.isAdmin) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Access Denied</h1>
        <p className="text-gray-600">You need administrator privileges.</p>
      </div>
    );
  }

  const categoryStats = getCategoryStats();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Product Management</h1>
        <button
          onClick={() => navigate('/add-product')}
          className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition flex items-center gap-2"
        >
          <FaPlus /> Add New Product
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-3xl font-bold text-orange-500">{products.length}</div>
          <div className="text-gray-600">Total Products</div>
        </div>
        {Object.entries(categoryStats).map(([cat, count], idx) => (
          <div key={cat} className="bg-white p-6 rounded-lg shadow">
            <div className={`text-3xl font-bold ${
              idx === 0 ? 'text-blue-500' :
              idx === 1 ? 'text-green-500' :
              idx === 2 ? 'text-purple-500' :
              'text-pink-500'
            }`}>
              {count}
            </div>
            <div className="text-gray-600 capitalize">{cat}</div>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin text-4xl text-orange-500" />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map(product => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img src={product.image} alt={product.name} className="w-12 h-12 rounded object-cover mr-3" />
                      <div>
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500 line-clamp-1">{product.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 capitalize">
                      {product.category || 'other'}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold">${product.price}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button onClick={() => viewProduct(product)} className="text-blue-500 hover:text-blue-600" title="View">
                        <FaEye />
                      </button>
                      <button onClick={() => handleEdit(product)} className="text-orange-500 hover:text-orange-600" title="Edit">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(product)} className="text-red-500 hover:text-red-600" title="Delete">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{productToDelete?.name}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 text-gray-600 hover:text-gray-800">
                Cancel
              </button>
              <button onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Edit Product</h3>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-gray-700 mb-2">Product Name</label>
                <input type="text" name="name" value={editForm.name} onChange={handleEditChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Description</label>
                <input type="text" name="description" value={editForm.description} onChange={handleEditChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Price</label>
                <input type="number" step="0.01" name="price" value={editForm.price} onChange={handleEditChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Category</label>
                <select name="category" value={editForm.category} onChange={handleEditChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option value="burgers">Burgers</option>
                  <option value="pizza">Pizza</option>
                  <option value="salads">Salads</option>
                  <option value="desserts">Desserts</option>
                  <option value="drinks">Drinks</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Image URL</label>
                <input type="text" name="image" value={editForm.image} onChange={handleEditChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Optional" />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Ingredients (comma separated)</label>
                <input type="text" name="ingredients" value={editForm.ingredients} onChange={handleEditChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button onClick={() => setShowEditModal(false)} className="px-4 py-2 text-gray-600 hover:text-gray-800">
                Cancel
              </button>
              <button onClick={saveEdit} className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProductsPage;