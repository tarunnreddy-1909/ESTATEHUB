import { useState, useEffect } from "react";
import ContactForm from "../components/ContactForm.jsx";

function Contact() {
  const [properties, setProperties] = useState([]);

  // useEffect: load property list for the "Property" dropdown in the form
  useEffect(() => {
    fetch("http://localhost:5000/api/properties")
      .then((res) => res.json())
      .then((data) => setProperties(data))
      .catch(() => setProperties([]));
  }, []);

  return (
    <div className="container section">
      <h1 className="page-title">Contact Us</h1>
      <p className="page-subtitle">We'd love to hear from you. Send us a message for any enquiries.</p>

      <div className="contact-layout">
        <div className="contact-info">
          <h3>Our Office</h3>
          <p>123, MG Road, Bangalore - 560001</p>
          <h3>Call Us</h3>
          <p>+91 98765 43210</p>
          <h3>Email Us</h3>
          <p>info@estatehub.com</p>
          <h3>Working Hours</h3>
          <p>Mon - Sat: 9:00 AM - 6:00 PM</p>
        </div>

        <div className="enquiry-box">
          <ContactForm properties={properties} defaultProperty="" />
        </div>
      </div>
    </div>
  );
}

export default Contact;
