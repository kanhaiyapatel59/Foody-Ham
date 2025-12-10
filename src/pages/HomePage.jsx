import React from 'react';
import { Link } from 'react-router-dom';
import FoodCard from '../components/FoodCard'; // Fixed import path

const homeFoods = [
  {
    id: 1,
    name: "Classic Cheeseburger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop",
    description: "Juicy beef patty with melted cheese, fresh vegetables and special sauce.",
    price:  11.99
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

function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop" 
          alt="Restaurant Interior" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to Foody-Ham
            </h1>
            <p className="text-xl mb-6">Your Go-To for Delicious Foods!</p>
            <Link 
              to="/menu" 
              className="bg-orange-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition duration-300 inline-block"
            >
              Order Now
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Foods */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Featured Foods</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {homeFoods.map(food => (
            <FoodCard key={food.id} {...food} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;