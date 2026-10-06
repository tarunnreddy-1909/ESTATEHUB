import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import PropertyCard from "../components/PropertyCard.jsx";

function Home({ favorites, onToggleFavorite }) {
  const [featured, setFeatured] = useState([]);

  // useEffect: runs once when the Home page loads, gets properties from Express
  useEffect(() => {
    fetch("http://localhost:5000/api/properties")
      .then((res) => res.json())
      .then((data) => setFeatured(data.slice(0, 3))) // first 3 are "featured"
      .catch(() => setFeatured([]));
  }, []);

  return (
    <div>
      <Hero />

      <section className="container section">
        <div className="section-head">
          <h2>Featured Properties</h2>
          <Link to="/properties" className="view-all">View All</Link>
        </div>

        <div className="card-grid">
          {featured.map((property) => (
            <PropertyCard
              key={property.id}
              id={property.id}
              name={property.name}
              price={property.priceText}
              location={property.location}
              bedrooms={property.bedrooms}
              bathrooms={property.bathrooms}
              area={property.area}
              image={property.image}
              isFavorite={favorites.includes(property.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
        {featured.length === 0 && <p className="note">Loading properties... (make sure the backend is running)</p>}
      </section>
    </div>
  );
}

export default Home;
