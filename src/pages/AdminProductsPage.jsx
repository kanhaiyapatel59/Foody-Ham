import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaEye, FaPlus } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({});

  const { user } = useAuth();
  const navigate = useNavigate();

  // Load all products (default + custom)
  useEffect(() => {
    const defaultProducts = [
      {
        id: 1,
        name: "Classic Cheeseburger",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop",
        description: "Juicy beef patty with melted cheese, fresh vegetables and special sauce.",
        price: 11.99,
        category: "burgers"
      },
      {
        id: 2,
        name: "Margherita Pizza",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop",
        description: "Classic pizza with fresh mozzarella, basil and tomato sauce.",
        price: 14.99,
        category: "pizza"
      },
      {
        id: 3,
        name: "Caesar Salad",
        image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&auto=format&fit=crop",
        description: "Crisp romaine lettuce with Caesar dressing, croutons and parmesan.",
        price: 9.99,
        category: "salads"
      }
    ];

    const customProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');
    setProducts([...defaultProducts, ...customProducts]);
  }, []);

  const handleDelete = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (productToDelete.id > 3) {
      // Delete custom product from localStorage
      const customProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');
      const updatedProducts = customProducts.filter(p => p.id !== productToDelete.id);
      localStorage.setItem('customProducts', JSON.stringify(updatedProducts));
      
      // Update state
      setProducts(prev => prev.filter(p => p.id !== productToDelete.id));
    } else {
      // Cannot delete default products
      alert('Cannot delete default products. You can only delete custom products.');
    }
    
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category || 'other'
    });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const saveEdit = () => {
    if (editingProduct.id > 3) {
      // Update custom product in localStorage
      const customProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');
      const updatedProducts = customProducts.map(p =>
        p.id === editingProduct.id ? { ...p, ...editForm } : p
      );
      localStorage.setItem('customProducts', JSON.stringify(updatedProducts));
      
      // Update state
      setProducts(prev =>
        prev.map(p => p.id === editingProduct.id ? { ...p, ...editForm } : p)
      );
    } else {
      // Cannot edit default products
      alert('Cannot edit default products. You can only edit custom products.');
    }
    
    setShowEditModal(false);
    setEditingProduct(null);
  };

  const viewProduct = (product) => {
    if (product.id > 3) {
      navigate(`/product/custom-${product.id}`);
    } else {
      navigate(`/product/${product.id}`);
    }
  };

  if (!user?.isAdmin) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Access Denied</h1>
        <p className="text-gray-600">You need administrator privileges to access this page.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Product Management</h1>
        <button
          onClick={() => navigate('/add-product')}
          className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition duration-300 flex items-center gap-2"
        >
          <FaPlus /> Add New Product
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-3xl font-bold text-orange-500">{products.length}</div>
          <div className="text-gray-600">Total Products</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-3xl font-bold text-blue-500">
            {products.filter(p => p.category === 'burgers').length}
          </div>
          <div className="text-gray-600">Burgers</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-3xl font-bold text-green-500">
            {products.filter(p => p.category === 'pizza').length}
          </div>
          <div className="text-gray-600">Pizza</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-3xl font-bold text-purple-500">
            {products.filter(p => p.id > 3).length}
          </div>
          <div className="text-gray-600">Custom Products</div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px 6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map(product => (
              <tr key={product.id} className="hover:bg-gray-50">
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
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                    {product.category || 'other'}
                  </span>
                </td>
                <td className="px-6 py-4 font-semibold">${product.price}</td>
                <td className="px-6 py-4">
                  {product.id > 3 ? (
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Custom</span>
                  ) : (
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Default</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => viewProduct(product)}
                      className="text-blue-500 hover:text-blue-600"
                      title="View"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-orange-500 hover:text-orange-600"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(product)}
                      className="text-red-500 hover:text-red-600"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{productToDelete?.name}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Edit Product</h3>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-gray-700 mb-2">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Description</label>
                <input
                  type="text"
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Price</label>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  value={editForm.price}
                  onChange={handleEditChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Category</label>
                <select
                  name="category"
                  value={editForm.category}
                  onChange={handleEditChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="burgers">Burgers</option>
                  <option value="pizza">Pizza</option>
                  <option value="salads">Salads</option>
                  <option value="desserts">Desserts</option>
                  <option value="drinks">Drinks</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
              >
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