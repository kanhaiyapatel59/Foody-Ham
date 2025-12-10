import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

// Default food items
const defaultFoodItems = {
  1: {
    name: "Classic Cheeseburger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop",
    description: "Our signature burger features a juicy 1/3 lb beef patty with melted cheddar cheese.",
    fullDescription: "This burger is made from 100% Angus beef, seasoned with our special blend of herbs and spices. Topped with fresh lettuce, ripe tomatoes, crispy onions, pickles, and our special secret sauce. Served in a toasted brioche bun with a side of golden fries.",
    price: 11.99,
    ingredients: [
      "Angus beef patty",
      "Cheddar cheese",
      "Brioche bun",
      "Lettuce",
      "Tomato",
      "Onion",
      "Pickles",
      "Special sauce"
    ],
    nutritionalInfo: {
      calories: 750,
      protein: "38g",
      carbs: "48g",
      fat: "35g"
    }
  },
  2: {
    name: "Margherita Pizza",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop",
    description: "Classic pizza with fresh mozzarella, basil and San Marzano tomato sauce.",
    fullDescription: "Our pizza dough is made fresh daily and left to rise for 24 hours. We use San Marzano tomatoes for our sauce and fresh buffalo mozzarella. Baked in our stone oven for that perfect crisp crust with a slightly charred edge.",
    price: 14.99,
    ingredients: [
      "Hand-tossed dough",
      "San Marzano tomato sauce",
      "Fresh mozzarella",
      "Fresh basil",
      "Extra virgin olive oil",
      "Sea salt"
    ],
    nutritionalInfo: {
      calories: 820,
      protein: "36g",
      carbs: "92g",
      fat: "32g"
    }
  },
  3: {
    name: "Caesar Salad",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&auto=format&fit=crop",
    description: "Crisp romaine lettuce with Caesar dressing, croutons and parmesan.",
    fullDescription: "Fresh romaine lettuce tossed in our house-made Caesar dressing with garlic croutons, shaved parmesan cheese, and a sprinkle of black pepper. Optional grilled chicken or shrimp add protein to this classic salad.",
    price: 9.99,
    ingredients: [
      "Romaine lettuce",
      "House-made Caesar dressing",
      "Garlic croutons",
      "Parmesan cheese",
      "Black pepper",
      "Optional: grilled chicken"
    ],
    nutritionalInfo: {
      calories: 320,
      protein: "12g",
      carbs: "18g",
      fat: "22g"
    }
  }
};

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const { user } = useAuth();
  
  let food;
  
  // Check if it's a custom product
  if (id && id.startsWith('custom-')) {
    const customId = id.replace('custom-', '');
    const customProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');
    food = customProducts.find(p => p.id.toString() === customId);
  } else {
    food = defaultFoodItems[id];
  }
  
  // Check for product passed via state
  if (!food && location.state?.product) {
    food = location.state.product;
  }

  if (!food) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Product not found</h1>
        <button 
          onClick={() => navigate('/menu')}
          className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition"
        >
          Back to Menu
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!user) {
      alert('Please login to add items to cart');
      navigate('/login', { state: { from: location } });
      return;
    }
    
    // Fix the ID for custom products
    const productId = id.startsWith('custom-') ? id : parseInt(id);
    
    const cartProduct = {
      id: productId,
      name: food.name,
      image: food.image,
      description: food.description,
      price: parseFloat(food.price) // Ensure it's a number
    };
    
    addToCart(cartProduct, 1);
    alert(`${food.name} has been added to your cart!`);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <button 
        onClick={() => navigate(-1)}
        className="text-orange-500 hover:text-orange-600 mb-6 flex items-center"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div>
          <img 
            src={food.image} 
            alt={food.name} 
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{food.name}</h1>
          <p className="text-gray-600 text-lg mb-6">{food.description}</p>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Full Description</h2>
            <p className="text-gray-700">{food.fullDescription}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Ingredients</h2>
            <ul className="list-disc list-inside text-gray-700">
              {Array.isArray(food.ingredients) ? 
                food.ingredients.map((ingredient, index) => (
                  <li key={index} className="mb-1">{ingredient}</li>
                )) : 
                <li>{food.ingredients}</li>
              }
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Nutritional Information</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-100 p-4 rounded text-center">
                <div className="text-sm text-gray-600">Calories</div>
                <div className="text-xl font-bold text-gray-800">{food.nutritionalInfo?.calories || 0}</div>
              </div>
              <div className="bg-gray-100 p-4 rounded text-center">
                <div className="text-sm text-gray-600">Protein</div>
                <div className="text-xl font-bold text-gray-800">{food.nutritionalInfo?.protein || "0g"}</div>
              </div>
              <div className="bg-gray-100 p-4 rounded text-center">
                <div className="text-sm text-gray-600">Carbs</div>
                <div className="text-xl font-bold text-gray-800">{food.nutritionalInfo?.carbs || "0g"}</div>
              </div>
              <div className="bg-gray-100 p-4 rounded text-center">
                <div className="text-sm text-gray-600">Fat</div>
                <div className="text-xl font-bold text-gray-800">{food.nutritionalInfo?.fat || "0g"}</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t pt-8">
            <div>
              <div className="text-3xl font-bold text-orange-500">${food.price}</div>
              <div className="text-gray-500">Price includes tax</div>
            </div>
            <button 
              onClick={handleAddToCart}
              disabled={!user}
              className="bg-orange-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              title={!user ? "Login to add to cart" : "Add to cart"}
            >
              {!user ? "Login to Add to Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;