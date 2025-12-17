import React, { useState } from 'react';
import { FaShare, FaFacebook, FaTwitter, FaWhatsapp, FaEnvelope, FaCopy, FaTimes } from 'react-icons/fa';

const SocialShare = ({ product, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareUrl = `${window.location.origin}/product/${product._id}`;
  const shareText = `Check out this delicious ${product.name} at Foody-Ham! Only $${product.price}`;

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
    email: `mailto:?subject=${encodeURIComponent(`Check out ${product.name}`)}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`
  };

  const handleShare = (platform) => {
    if (platform === 'copy') {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      window.open(shareLinks[platform], '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Share {product.name}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <button
            onClick={() => handleShare('facebook')}
            className="flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <FaFacebook /> Facebook
          </button>
          
          <button
            onClick={() => handleShare('twitter')}
            className="flex items-center justify-center gap-2 p-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500"
          >
            <FaTwitter /> Twitter
          </button>
          
          <button
            onClick={() => handleShare('whatsapp')}
            className="flex items-center justify-center gap-2 p-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            <FaWhatsapp /> WhatsApp
          </button>
          
          <button
            onClick={() => handleShare('email')}
            className="flex items-center justify-center gap-2 p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            <FaEnvelope /> Email
          </button>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 p-2 border border-gray-300 rounded text-sm"
            />
            <button
              onClick={() => handleShare('copy')}
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              <FaCopy />
            </button>
          </div>
          {copied && <p className="text-green-600 text-sm mt-2">Link copied!</p>}
        </div>
      </div>
    </div>
  );
};

export default SocialShare;