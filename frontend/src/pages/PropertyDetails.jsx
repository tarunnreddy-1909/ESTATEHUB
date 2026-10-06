import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ContactForm from "../components/ContactForm.jsx";

function PropertyDetails() {
  // useParams reads :id from the URL /property/:id
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [error, setError] = useState("");

  // useEffect: fetch this one property. Runs again whenever the id changes.
  useEffect(() => {
    fetch("http://localhost:5000/api/properties/" + id)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => setProperty(data))
      .catch(() => setError("Property not found or backend is not running."));
  }, [id]);

  if (error) {
    return (
      <div className="container section">
        <p className="error">{error}</p>
        <Link to="/properties">← Back to Properties</Link>
      </div>
    );
  }

  if (!property) {
    return <div className="container section"><p className="note">Loading...</p></div>;
  }

  return (
    <div className="container section">
      <Link to="/properties" className="back-link">← Back to Properties</Link>

      <div className="details-layout">
        <div className="details-main">
          <img className="details-image" src={property.image} alt={property.name} />

          <h1>{property.name}</h1>
          <p className="price big">{property.priceText}</p>
          <p className="location">📍 {property.location}</p>

          <div className="card-info details-info">
            <span>🛏 {property.bedrooms} Beds</span>
            <span>🛁 {property.bathrooms} Baths</span>
            <span>📐 {property.area} sq.ft</span>
            <span>🏠 {property.type} ({property.purpose})</span>
          </div>

          <h3>Description</h3>
          <p>{property.description}</p>

          <h3>Amenities</h3>
          <ul className="amenities">
            {property.amenities.map((item) => (
              <li key={item}>✔ {item}</li>
            ))}
          </ul>
        </div>

        <aside className="enquiry-box">
          <h3>Enquire Now</h3>
          {/* Parent -> child: only this property is passed to the form */}
          <ContactForm
            properties={[property]}
            defaultProperty={property.name + " - " + property.location}
          />
        </aside>
      </div>
    </div>
  );
}

export default PropertyDetails;
