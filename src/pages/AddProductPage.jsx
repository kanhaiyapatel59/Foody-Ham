import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddProductPage() {
  const navigate = useNavigate();
  
  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    ingredients: '',
    fullDescription: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    category: ''
  });

  // State for added products
  const [addedProducts, setAddedProducts] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate a new ID (current highest ID + 1)
    const newId = addedProducts.length > 0 
      ? Math.max(...addedProducts.map(p => p.id)) + 1 
      : 4; // Start from 4 since we have 3 default items

    // Create new product object
    const newProduct = {
      id: newId,
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      image: formData.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop',
      ingredients: formData.ingredients.split(',').map(item => item.trim()),
      fullDescription: formData.fullDescription,
      nutritionalInfo: {
        calories: parseInt(formData.calories) || 0,
        protein: formData.protein || "0g",
        carbs: formData.carbs || "0g",
        fat: formData.fat || "0g"
      },
      category: formData.category
    };

    // Add to local storage
    const existingProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');
    const updatedProducts = [...existingProducts, newProduct];
    localStorage.setItem('customProducts', JSON.stringify(updatedProducts));

    // Update state
    setAddedProducts(updatedProducts);
    
    // Show success message
    setShowSuccessMessage(true);
    
    // Reset form
    setFormData({
      name: '',
      description: '',
      price: '',
      image: '',
      ingredients: '',
      fullDescription: '',
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
      category: ''
    });

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);

    console.log('Product added:', newProduct);
  };

  // Load added products on component mount
  React.useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');
    setAddedProducts(savedProducts);
  }, []);

  // Function to view product details
  const viewProductDetails = (product) => {
    // For custom products, we'll navigate to a special route
    navigate(`/product/custom/${product.id}`, { state: { product } });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Add New Product</h1>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          Product added successfully! It will appear in the list below.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Add Product Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Product Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">
                Product Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="category">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              >
                <option value="">Select Category</option>
                <option value="burgers">Burgers</option>
                <option value="pizza">Pizza</option>
                <option value="salads">Salads</option>
                <option value="desserts">Desserts</option>
                <option value="drinks">Drinks</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="description">
                Short Description *
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="price">
                Price ($) *
              </label>
              <input
                type="number"
                step="0.01"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="image">
                Image URL (Optional)
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="https://images.unsplash.com/photo-..."
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="ingredients">
                Ingredients (comma separated) *
              </label>
              <textarea
                id="ingredients"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                rows="3"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="fullDescription">
                Full Description *
              </label>
              <textarea
                id="fullDescription"
                name="fullDescription"
                value={formData.fullDescription}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                rows="4"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="calories">
                  Calories
                </label>
                <input
                  type="number"
                  id="calories"
                  name="calories"
                  value={formData.calories}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="protein">
                  Protein (e.g., 20g)
                </label>
                <input
                  type="text"
                  id="protein"
                  name="protein"
                  value={formData.protein}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="carbs">
                  Carbs (e.g., 45g)
                </label>
                <input
                  type="text"
                  id="carbs"
                  name="carbs"
                  value={formData.carbs}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="fat">
                  Fat (e.g., 15g)
                </label>
                <input
                  type="text"
                  id="fat"
                  name="fat"
                  value={formData.fat}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-orange-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition duration-300 w-full"
            >
              Add Product
            </button>
          </form>
        </div>

        {/* Added Products List */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Recently Added Products</h2>
          
          {addedProducts.length === 0 ? (
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <p className="text-gray-600">No products added yet. Add your first product using the form!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {addedProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start space-x-4">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
                      <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-orange-500 font-bold text-lg">${product.price}</span>
                        <button
                          onClick={() => viewProductDetails(product)}
                          className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddProductPage;