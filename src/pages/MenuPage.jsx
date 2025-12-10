import React, { useState, useEffect } from 'react';
import FoodCard from '../components/FoodCard';
import { useNavigate } from 'react-router-dom';

const defaultMenuItems = [
  {
    id: 1,
    name: "Classic Cheeseburger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop",
    description: "Juicy beef patty with melted cheese, fresh vegetables and special sauce.",
    price: 11.99
  },
  {
    id: 2,
    name: "Margherita Pizza",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop",
    description: "Classic pizza with fresh mozzarella, basil and tomato sauce.",
    price: 14.99
  },
  {
    id: 3,
    name: "Caesar Salad",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&auto=format&fit=crop",
    description: "Crisp romaine lettuce with Caesar dressing, croutons and parmesan.",
    price: 9.99
  }
  
];

function MenuPage() {
  const [menuItems, setMenuItems] = useState(defaultMenuItems);
  const navigate = useNavigate();


  useEffect(() => {
    const customProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');

    const allProducts = [...defaultMenuItems, ...customProducts];
    setMenuItems(allProducts);
  }, []);

  const handleProductClick = (item) => {
    if (item.id > 3) { 
      navigate(`/product/custom-${item.id}`, { state: { product: item } });
    } else {
      navigate(`/product/${item.id}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">Our Menu</h1>
      <p className="text-center text-gray-600 mb-8">
        {menuItems.length > 3 ? `${menuItems.length - 3} custom products added` : ''}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {menuItems.map(item => (
          <div key={item.id} onClick={() => handleProductClick(item)} className="cursor-pointer">
            <FoodCard {...item} />
            {item.id > 3 && (
              <div className="text-xs text-green-600 mt-2 text-center">
                ✓ Custom Product
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuPage;