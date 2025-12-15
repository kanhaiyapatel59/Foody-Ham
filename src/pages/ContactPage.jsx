import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaPaperPlane, FaUser, FaCheckCircle,FaFacebook,FaInstagram,FaTwitter,FaYoutube,FaHeadset,FaWhatsapp,FaCommentAlt,FaShippingFast,FaUtensils,FaCreditCard
} from 'react-icons/fa';

const CONTACT_BACKGROUNDS = [
  "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",
  "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg",
  "https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg",
  "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg"
];

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Auto-sliding background effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentBgIndex(prevIndex => (prevIndex + 1) % CONTACT_BACKGROUNDS.length);
        setIsVisible(true);
      }, 300);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

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
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Enhanced Hero Section with Auto-Sliding Background */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        {/* Background Slider */}
        <div className="absolute inset-0">
          {CONTACT_BACKGROUNDS.map((bg, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentBgIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img 
                src={bg} 
                alt="Food background" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-900/40 to-transparent"></div>
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="max-w-4xl text-center">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-semibold animate-pulse">
              <FaHeadset className="text-white" />
              <span>24/7 CUSTOMER SUPPORT</span>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
              Get in <span className="block mt-4 bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-300 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
              We're here to help, answer questions, and provide exceptional support
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        {/* Success Message - Enhanced */}
        {isSubmitted && (
          <div className="mb-12">
            <div className="backdrop-blur-xl bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-3xl p-8 shadow-2xl">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <FaCheckCircle className="text-white text-3xl" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-3xl font-bold text-white mb-3">Message Sent Successfully!</h3>
                  <p className="text-green-200 text-lg">
                    Thank you for reaching out. Our team will respond within 24 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Enhanced Contact Form */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gray-200/50">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
                <FaPaperPlane className="text-white text-2xl" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Send Us a Message</h2>
                <p className="text-gray-600 mt-2">Fill out the form below and we'll get back to you promptly</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <FaUser className="text-gray-400 text-lg" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name *"
                    className="w-full pl-12 px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all duration-300 text-lg"
                    required
                  />
                </div>

                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <FaEnvelope className="text-gray-400 text-lg" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email address *"
                    className="w-full pl-12 px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all duration-300 text-lg"
                    required
                  />
                </div>

                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <FaPhone className="text-gray-400 text-lg" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone number (optional)"
                    className="w-full pl-12 px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all duration-300 text-lg"
                  />
                </div>

                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <FaCommentAlt className="text-gray-400 text-lg" />
                  </div>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject *"
                    className="w-full pl-12 px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all duration-300 text-lg"
                    required
                  />
                </div>
              </div>

              <div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  placeholder="How can we help you today? *"
                  className="w-full px-5 py-5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all duration-300 text-lg resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-5 rounded-xl text-lg font-semibold hover:shadow-2xl hover:shadow-orange-500/30 hover:from-orange-600 hover:to-amber-600 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3 group"
              >
                <FaPaperPlane className="group-hover:translate-x-1 transition-transform" />
                Send Message
              </button>
            </form>
          </div>

          {/* Enhanced Contact Information */}
          <div className="space-y-8">
            {/* Contact Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 border border-blue-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <FaMapMarkerAlt className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Visit Our Restaurant</h3>
                <p className="text-gray-700 leading-relaxed">
                  123 Gourmet Street, Culinary District<br />
                  Food City, FC 10101
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl p-8 border border-green-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <FaPhone className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Call Us</h3>
                <p className="text-gray-700 text-lg font-semibold mb-2">+1 (555) 123-4567</p>
                <p className="text-gray-600 text-sm">General Inquiries</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-8 border border-purple-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <FaEnvelope className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Email Us</h3>
                <p className="text-gray-700 text-lg font-semibold mb-2">contact@foodyham.com</p>
                <p className="text-gray-600 text-sm">Support & Inquiries</p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-amber-100 rounded-3xl p-8 border border-yellow-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <FaClock className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Business Hours</h3>
                <div className="space-y-1">
                  <p className="text-gray-700">Mon-Fri: 10:00 AM - 10:00 PM</p>
                  <p className="text-gray-700">Weekends: 9:00 AM - 11:00 PM</p>
                  <p className="text-gray-600 text-sm">Delivery available during business hours</p>
                </div>
              </div>
            </div>

            {/* Emergency Support Card */}
            <div className="bg-gradient-to-br from-red-500 via-orange-500 to-amber-500 rounded-3xl p-8 text-white shadow-2xl transform hover:-translate-y-1 transition-all duration-500">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <FaWhatsapp className="text-white text-3xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">24/7 Emergency Support</h3>
                    <p className="text-white/90">For urgent order issues and immediate assistance</p>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <div className="text-3xl font-black mb-2">+1 (800) 555-HELP</div>
                  <div className="bg-white text-orange-600 px-6 py-2 rounded-xl font-bold text-sm inline-block">
                    AVAILABLE 24/7
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Map */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
                    <FaMapMarkerAlt className="text-white text-xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Find Us on the Map</h3>
                </div>
                <div className="rounded-2xl overflow-hidden border-2 border-gray-100">
                  <div className="h-80">
                    <iframe
                      title="Foody-Ham Location"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.177858804427!2d-73.98784468459418!3d40.70555177933205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a315cdf4c9b%3A0x8b934de5cae6f7a!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1624567890123!5m2!1sen!2s"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      className="rounded-lg"
                    ></iframe>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-gray-600">Get directions to our flagship restaurant</p>
                  <button className="px-6 py-2.5 bg-gray-900 text-white rounded-xl font-semibold hover:bg-black transition-colors">
                    Get Directions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-sm text-orange-500 font-semibold mb-3">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
              COMMON QUESTIONS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked <span className="text-orange-500">Questions</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find quick answers to common inquiries about our services and policies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: <FaShippingFast />,
                question: "What are your delivery hours and areas?",
                answer: "We deliver from 10 AM to 10 PM daily, covering all major city areas. Express delivery is available in select zones with 30-minute guarantee.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: <FaUtensils />,
                question: "Do you offer catering for large events?",
                answer: "Yes! We provide full catering services for events from 20 to 500+ guests. Contact our catering team for custom menus and event planning.",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: <FaCreditCard />,
                question: "What payment methods do you accept?",
                answer: "We accept all major credit/debit cards, PayPal, Apple Pay, Google Pay, and cash on delivery. Corporate accounts and gift cards also available.",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: <FaClock />,
                question: "How can I track my order status?",
                answer: "Real-time tracking is available through our app and website. You'll receive SMS/email updates at every stage of your order's journey.",
                color: "from-yellow-500 to-amber-500"
              }
            ].map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl hover:border-orange-200 transition-all duration-500 group"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${faq.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white text-2xl">
                    {faq.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Social Media Section */}
        <div className="mt-24">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl shadow-2xl p-12 text-center text-white">
            <h3 className="text-3xl font-bold mb-6">Connect With Us</h3>
            <p className="text-gray-300 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
              Follow us on social media for daily specials, cooking tips, and behind-the-scenes content
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { icon: <FaFacebook />, label: "Facebook", color: "from-blue-600 to-blue-700", hover: "hover:from-blue-700 hover:to-blue-800" },
                { icon: <FaInstagram />, label: "Instagram", color: "from-pink-500 to-purple-500", hover: "hover:from-pink-600 hover:to-purple-600" },
                { icon: <FaTwitter />, label: "Twitter", color: "from-blue-400 to-cyan-500", hover: "hover:from-blue-500 hover:to-cyan-600" },
                { icon: <FaYoutube />, label: "YouTube", color: "from-red-500 to-red-600", hover: "hover:from-red-600 hover:to-red-700" },
                { icon: <FaWhatsapp />, label: "WhatsApp", color: "from-green-500 to-green-600", hover: "hover:from-green-600 hover:to-green-700" }
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className={`group bg-gradient-to-br ${social.color} ${social.hover} w-24 h-24 rounded-3xl flex flex-col items-center justify-center gap-3 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}
                >
                  <div className="text-3xl text-white">{social.icon}</div>
                  <span className="text-white text-sm font-medium">{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;