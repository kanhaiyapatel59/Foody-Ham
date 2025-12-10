import React from 'react';
import { FaLeaf, FaShippingFast, FaAward, FaHeart, FaClock, FaUsers } from 'react-icons/fa';

function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <div className="relative h-96 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Restaurant interior" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/70 to-orange-600/50"></div>
        </div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">About Foody-Ham</h1>
            <p className="text-xl md:text-2xl">Serving Happiness One Meal at a Time</p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-gradient-to-b from-white to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              To revolutionize food delivery by connecting people with exceptional local restaurants 
              and chefs, delivering not just meals but memorable dining experiences right to your doorstep.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content - Your original code enhanced */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Story Section with Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-700">
                  <p className="text-lg">
                    Foody-Ham is a premier platform for ordering the best foods online. We focus on quality, 
                    freshness, and delivering an exceptional dining experience right to your doorstep.
                  </p>
                  <p className="text-lg">
                    Founded with a passion for good food, we partner with the finest local restaurants and chefs 
                    to bring you a diverse menu of delicious dishes. Our commitment is to provide fresh, 
                    high-quality meals prepared with care and delivered with speed.
                  </p>
                  <p className="text-lg">
                    Whether you're craving comfort food, healthy options, or gourmet specialties, 
                    Foody-Ham makes it easy to discover and enjoy amazing food from the comfort of your home.
                  </p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Chef preparing food" 
                  className="rounded-2xl shadow-xl w-full h-96 object-cover"
                />
                <div className="absolute -bottom-4 -right-4 bg-white p-6 rounded-2xl shadow-lg max-w-xs">
                  <h3 className="font-bold text-orange-500 text-xl mb-2">Since 2018</h3>
                  <p className="text-gray-600">Serving customers with love and dedication</p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid - Enhanced your original features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose Foody-Ham?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaLeaf className="text-2xl text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">Fresh Ingredients</h3>
                <p className="text-gray-600 text-center">
                  We source only the freshest, locally grown ingredients to ensure maximum flavor and nutrition in every meal.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaShippingFast className="text-2xl text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">Lightning Fast Delivery</h3>
                <p className="text-gray-600 text-center">
                  Our dedicated delivery team ensures your food arrives hot and fresh in 30 minutes or less, guaranteed.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaAward className="text-2xl text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">Quality Guaranteed</h3>
                <p className="text-gray-600 text-center">
                  100% satisfaction guarantee. If you're not happy with your meal, we'll make it right or refund your order.
                </p>
              </div>

              {/* Additional Features */}
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaHeart className="text-2xl text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">Made with Love</h3>
                <p className="text-gray-600 text-center">
                  Every dish is prepared with care and attention to detail by our passionate team of chefs.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaClock className="text-2xl text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">24/7 Service</h3>
                <p className="text-gray-600 text-center">
                  Satisfy your cravings anytime. We're open 24 hours a day, 7 days a week to serve you.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaUsers className="text-2xl text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">Community Focused</h3>
                <p className="text-gray-600 text-center">
                  We support local farmers and restaurants, helping to build stronger communities together.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center text-white">
                <div className="text-4xl font-bold mb-2">10K+</div>
                <div className="text-orange-100">Happy Customers</div>
              </div>
              <div className="text-center text-white">
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-orange-100">Restaurant Partners</div>
              </div>
              <div className="text-center text-white">
                <div className="text-4xl font-bold mb-2">30min</div>
                <div className="text-orange-100">Avg. Delivery Time</div>
              </div>
              <div className="text-center text-white">
                <div className="text-4xl font-bold mb-2">4.9★</div>
                <div className="text-orange-100">Customer Rating</div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Meet Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-48 h-48 rounded-full overflow-hidden mx-auto mb-4 border-4 border-orange-100">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                    alt="Kanhaiya Patel" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Kanhaiya Patel</h3>
                <p className="text-orange-500 font-medium">Head Chef & Founder</p>
                <p className="text-gray-600 mt-2">15+ years of culinary experience, passionate about creating unforgettable dining experiences</p>
              </div>
              
              <div className="text-center">
                <div className="w-48 h-48 rounded-full overflow-hidden mx-auto mb-4 border-4 border-orange-100">
                  <img 
                    src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                    alt="Manish Basnet" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Manish Basnet</h3>
                <p className="text-orange-500 font-medium">Operations Director</p>
                <p className="text-gray-600 mt-2">Expert in logistics and customer service, ensuring seamless operations and exceptional experiences</p>
              </div>
              
              <div className="text-center">
                <div className="w-48 h-48 rounded-full overflow-hidden mx-auto mb-4 border-4 border-orange-100">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                    alt="Mansur Ansari" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Mansur Ansari</h3>
                <p className="text-orange-500 font-medium">Delivery Manager</p>
                <p className="text-gray-600 mt-2">Oversees our delivery network, ensuring timely and efficient service across all locations</p>
              </div>
              
              <div className="text-center">
                <div className="w-48 h-48 rounded-full overflow-hidden mx-auto mb-4 border-4 border-orange-100">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                    alt="Jp Shah" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Jp Shah</h3>
                <p className="text-orange-500 font-medium">Marketing Director</p>
                <p className="text-gray-600 mt-2">Drives brand growth and customer engagement through innovative marketing strategies</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Taste the Difference?</h2>
            <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust Foody-Ham for their daily meals and special occasions.
            </p>
            <button className="bg-orange-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition duration-300">
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;