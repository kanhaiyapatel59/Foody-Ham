import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaPaperPlane, FaUser, FaCheckCircle } from 'react-icons/fa';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Contact us background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/70 to-orange-600/50"></div>
        </div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-xl">We're here to help and answer any questions</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          
          {/* Success Message */}
          {isSubmitted && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-center space-x-3">
                <FaCheckCircle className="text-3xl text-green-500" />
                <div>
                  <h3 className="text-xl font-bold text-green-800">Message Sent Successfully!</h3>
                  <p className="text-green-600">Thank you for contacting us. We'll get back to you within 24 hours.</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form - Enhanced */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                  <FaPaperPlane className="text-2xl text-orange-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">Send us a Message</h2>
                  <p className="text-gray-600 mt-1">We typically respond within 24 hours</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <div className="absolute left-4 top-3">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full pl-12 px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                    required
                  />
                </div>

                <div className="relative">
                  <div className="absolute left-4 top-3">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email address"
                    className="w-full pl-12 px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                    required
                  />
                </div>

                <div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    placeholder="How can we help you today?"
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl text-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                >
                  <FaPaperPlane /> Send Message
                </button>
              </form>
            </div>

            {/* Contact Information - Enhanced */}
            <div className="space-y-8">
              {/* Contact Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                    <FaMapMarkerAlt className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Our Location</h3>
                  <p className="text-gray-600">123 Food Street, Culinary City, CC 10101</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                    <FaPhone className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Call Us</h3>
                  <p className="text-gray-600">+1 (123) 456-7890</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4">
                    <FaEnvelope className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Email Us</h3>
                  <p className="text-gray-600">info@foodyham.com</p>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6">
                  <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center mb-4">
                    <FaClock className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Business Hours</h3>
                  <p className="text-gray-600">Mon-Sun: 10:00 AM - 10:00 PM</p>
                </div>
              </div>

              {/* Map Section */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Find Us Here</h3>
                  <div className="rounded-xl overflow-hidden border border-gray-200">
                    <div className="h-64">
                      <iframe
                        title="Foody-Ham Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.177858804427!2d-73.98784468459418!3d40.70555177933205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a315cdf4c9b%3A0x8b934de5cae6f7a!2sNew%20York%2C%20NY%2C   USA!5e0!3m2!1sen!2s!4v1624567890123!5m2!1sen!2s"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        className="rounded-lg"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Need Immediate Assistance?</h3>
                <p className="mb-6">For urgent matters, call our customer support hotline available 24/7</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold">+1 (800) 123-4567</div>
                    <p className="text-orange-100">Emergency Support Line</p>
                  </div>
                  <div className="bg-white text-orange-500 px-6 py-3 rounded-lg font-semibold">
                    24/7 Available
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-bold text-gray-800 mb-3">What are your delivery hours?</h3>
                <p className="text-gray-600">We deliver from 10:00 AM to 10:00 PM, 7 days a week. Express delivery is available for orders placed before 9:30 PM.</p>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Do you offer catering services?</h3>
                <p className="text-gray-600">Yes! We provide catering for events of all sizes. Contact us at catering@foodyham.com for custom menus and pricing.</p>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-bold text-gray-800 mb-3">How can I track my order?</h3>
                <p className="text-gray-600">Once your order is dispatched, you'll receive a tracking link via SMS and email with real-time updates on your delivery status.</p>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-bold text-gray-800 mb-3">What payment methods do you accept?</h3>
                <p className="text-gray-600">We accept all major credit cards, PayPal, Apple Pay, Google Pay, and cash on delivery for your convenience.</p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="mt-16 bg-gray-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Follow Us on Social Media</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Stay updated with our latest offers, new menu items, and behind-the-scenes content.</p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition">
                <span className="font-bold">f</span>
              </a>
              <a href="#" className="w-12 h-12 bg-pink-600 text-white rounded-full flex items-center justify-center hover:bg-pink-700 transition">
                <span className="font-bold">ig</span>
              </a>
              <a href="#" className="w-12 h-12 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition">
                <span className="font-bold">t</span>
              </a>
              <a href="#" className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition">
                <span className="font-bold">yt</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;