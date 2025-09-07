import React, { useState, useRef } from "react";
import { Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import "./App.css";
import logo from "./assets/logo.png";
import bgImage from "./assets/logo1.png";         // Desktop background
import bgImageMobile from "./assets/412x915.jpg"; // Mobile background

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Refs for uncontrolled form
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const cityRef = useRef();       // ✅ Fixed missing ref
  const ticketsRef = useRef();
  const messageRef = useRef();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const formValues = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      city: cityRef.current.value,   // ✅ Added city
      tickets: ticketsRef.current.value,
      message: messageRef.current.value,
    };

    emailjs
      .send(
        "service_44xj69q",      // Your EmailJS Service ID
        "template_8wyadzh",     // Your EmailJS Template ID
        formValues,
        "rwvUSOXqAm_qXGTY4"    // Your Public Key
      )
      .then(() => {
        console.log("✅ Email sent successfully!");
        setIsSubmitted(true);

        // Reset form
        e.target.reset();

        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("❌ Email send error:", error);
        alert("Something went wrong. Please try again.");
      });
  };

  // Navbar component
  const Navbar = () => (
    <nav>
      <div className="logo">
        <img src={logo} alt="Logo" className="nav-logo" />
      </div>
      <ul>
        <li>
          <button type="button" onClick={() => setCurrentPage("home")}>
            Home
          </button>
        </li>
        <li>
          <button type="button" onClick={() => setCurrentPage("contact")}>
            Contact
          </button>
        </li>
      </ul>
    </nav>
  );

  // Wrapper with background image
  const AppWrapper = ({ children }) => (
    <div className="app-wrapper">{children}</div>
  );

  return (
    <AppWrapper>
      <Navbar />

      {/* Home Page */}
      {currentPage === "home" && (
        <div className="hero">
          <div className="overlay"></div>
          <div className="hero-content">
            <h1>BOOK YOUR TICKET NOW</h1>
            <p>FIRST 100 TICKETS ARE FREE</p>
            <button
              type="button"
              className="cta-btn"
              onClick={() => setCurrentPage("contact")}
            >
              Buy Tickets Now
            </button>
          </div>
        </div>
      )}

      {/* Contact Page */}
      {currentPage === "contact" && (
        <div className="contact-container">
          <h1>Reserve Your Tickets</h1>
          <p>Secure your spot for an unforgettable evening</p>

          {isSubmitted ? (
            <div className="contact-form">
              <h2 style={{ color: "#00ff99" }}>Thank You!</h2>
              <p>Your request has been submitted. We'll contact you soon!</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              {/* Name */}
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                name="name"
                ref={nameRef}
                required
                placeholder="Enter your full name"
              />

              {/* Email */}
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                ref={emailRef}
                required
                placeholder="example@email.com"
              />

              {/* Phone */}
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                ref={phoneRef}
                required
                placeholder="+91 9876543210"
              />

              {/* City Selection */}
              <label htmlFor="city">Select City</label>
              <select
                id="city"
                name="city"
                ref={cityRef}
                defaultValue="Bangalore"
                required
              >
                <option value="Belagavi" disabled>
                  Belagavi → ❌ not opened for booking
                </option>
                <option value="Mysore" disabled>
                  Mysore → ❌ not opened for booking
                </option>
                <option value="Bangalore">
                  Bangalore → ✅ booking available
                </option>
                <option value="Shivamogga" disabled>
                  Shivamogga → ❌ not opened for booking
                </option>
              </select>

              {/* Tickets */}
              <label htmlFor="tickets">Number of Tickets</label>
              <select
                id="tickets"
                name="tickets"
                ref={ticketsRef}
                defaultValue="1"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <option key={num} value={num}>
                    {num} Ticket{num > 1 ? "s" : ""}{" "}
                    {num <= 5 ? "(Free)" : `(₹${(num - 5) * 2500})`}
                  </option>
                ))}
              </select>

              {/* Message */}
              <label htmlFor="message">Special Requests</label>
              <textarea
                id="message"
                name="message"
                ref={messageRef}
                rows="4"
                placeholder="Any special requirements? (Optional)"
              />

              <button type="submit">
                <Send size={18} /> Reserve Tickets Now
              </button>
            </form>
          )}
        </div>
      )}
    </AppWrapper>
  );
};

export default App;
