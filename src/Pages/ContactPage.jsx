// src/pages/ContactPage.jsx
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Info } from 'lucide-react';
import facebook from '../assets/face-logo.png';
import twitter from '../assets/X-logo.png';
import instagram from '../assets/insta-logo.png';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); 
        setSubmitMessage('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });

    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitMessage('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-200 via-white to-red-100 py-16 px-4 sm:px-6 lg:px-8 page-fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-brand-green mb-6 leading-tight animate-fade-in-down">
            Get in Touch with Annapoorna
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto animate-fade-in delay-200">
            Have questions, suggestions, or just want to say hello? We'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 animate-slide-in-left">
            <h2 className="text-4xl font-bold text-gray-800 mb-8 flex items-center gap-4">
              <Info className="text-brand-orange" size={40} /> Contact Info
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4 text-gray-700 text-lg">
                <Mail size={24} className="text-brand-green mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Email Us</h3>
                  <a href="mailto:info@annapoorna.org" className="hover:text-brand-orange transition-colors">info@annapoorna.org</a>
                </div>
              </div>
              <div className="flex items-start gap-4 text-gray-700 text-lg">
                <Phone size={24} className="text-brand-green mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Call Us</h3>
                  <a href="tel:+919076456782" className="hover:text-brand-orange transition-colors">+91 9076456782</a>
                </div>
              </div>
              <div className="flex items-start gap-4 text-gray-700 text-lg">
                <MapPin size={24} className="text-brand-green mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Our Office</h3>
                  <p>123 Food Drive, Greater Noida, PIN 201310</p>
                  <p>India</p>
                </div>
              </div>
            </div>
            
            {/* Social Media Links (Optional) */}
            <div className="mt-10 pt-6 border-t border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4 text-xl">Follow Us</h3>
              <div className="flex gap-4">
                <a href="#" className="text-gray-500 hover:text-brand-orange transition-colors">
                  <img src={facebook} alt="Facebook" className="w-10 h-10" />
                </a>
                <a href="#" className="text-gray-500 hover:text-brand-orange transition-colors">
                  <img src={twitter} alt="Twitter" className="mt-2.5 w-10 h-6" />
                </a>
                <a href="https://www.instagram.com/annapoornaconnect/" className="text-gray-500 hover:text-brand-orange transition-colors">
                  <img src={instagram} alt="Instagram" className="mt-1.5  w-8 h-8" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 animate-slide-in-right">
            <h2 className="text-4xl font-bold text-gray-800 mb-8 flex items-center gap-4">
              <Send className="text-brand-green" size={40} /> Send us a message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-brand-green focus:border-brand-green outline-none transition-all"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-brand-green focus:border-brand-green outline-none transition-all"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-brand-green focus:border-brand-green outline-none transition-all"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-brand-green focus:border-brand-green outline-none transition-all"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-lg font-medium rounded-lg text-white bg-brand-orange hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange transition-all duration-200"
                >
                  {isSubmitting ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <>
                      <Send size={20} className="mr-3" /> Send Message
                    </>
                  )}
                </button>
              </div>
              {submitMessage && (
                <div className={`mt-4 p-3 rounded-lg text-center ${submitMessage.includes('Thank you') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {submitMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;