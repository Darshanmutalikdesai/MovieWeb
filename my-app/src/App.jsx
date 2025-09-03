import React, { useState } from 'react';
import { Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import './App.css';
import logo from './assets/logo.png';
import bgImage from './assets/logo1.png';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    tickets: 1,
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send email using EmailJS
    emailjs.send(
      'service_d3hwz26',
      'template_f94xa2e',
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        tickets: formData.tickets,
        message: formData.message,
      },
      'gyOU3pR7VJP7mBJwO'
    )
    .then(() => {
      console.log('Email sent successfully!');
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', phone: '', tickets: 1, message: '' });
      }, 3000);
    })
    .catch((error) => {
      console.error('Email send error:', error);
      alert('Something went wrong. Please try again.');
    });
  };

  const Navbar = () => (
    <nav>
      <div className="logo">
        <img src={logo} alt="Logo" className="nav-logo" />
      </div>
      <ul>
        <li><button onClick={() => setCurrentPage('home')}>Home</button></li>
        {/* <li><a href="#about">About</a></li>
        <li><a href="#gallery">Gallery</a></li> */}
        <li><button onClick={() => setCurrentPage('contact')}>Contact</button></li>
      </ul>
    </nav>
  );

  const AppWrapper = ({ children }) => (
    <div
      style={{
        background: `url(${bgImage}) no-repeat center center fixed`,
        backgroundSize: 'cover',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      {children}
    </div>
  );

  return (
    <AppWrapper>
      <Navbar />
      {currentPage === 'home' && (
        <div className="hero">
          <div className="overlay"></div>
          <div className="hero-content">
            <h1>BOOK YOUR TICKET NOW </h1>
            <p>FIRST 100 TICKETS ARE FREE </p>
            <button className="cta-btn" onClick={() => setCurrentPage('contact')}>
              Buy Tickets Now
            </button>
          </div>
        </div>
      )}

      {currentPage === 'contact' && (
        <div className="contact-container">
          <h1>Reserve Your Tickets</h1>
          <p>Secure your spot for an unforgettable evening</p>

          {isSubmitted ? (
            <div className="contact-form">
              <h2 style={{ color: '#00ff99' }}>Thank You!</h2>
              <p>Your request has been submitted. We'll contact you soon!</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="Full Name" />
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="Email Address" />
              <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required placeholder="Phone Number" />
              <select name="tickets" value={formData.tickets} onChange={handleInputChange}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                  <option key={num} value={num}>{num} Ticket{num > 1 ? 's' : ''} (₹{num * 2500})</option>
                ))}
              </select>
              <textarea name="message" value={formData.message} onChange={handleInputChange} rows="4" placeholder="Special Requests"></textarea>
              <button type="submit"><Send size={18} /> Reserve Tickets Now</button>
            </form>
          )}
        </div>
      )}
    </AppWrapper>
  );
};

export default App;
