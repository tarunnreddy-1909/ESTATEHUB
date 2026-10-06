import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropertyCard from "../components/PropertyCard.jsx";

function Favorites({ favorites, onToggleFavorite }) {
  const [properties, setProperties] = useState([]);

  // useEffect: get all properties, then we keep only the favorite ones below
  useEffect(() => {
    fetch("http://localhost:5000/api/properties")
      .then((res) => res.json())
      .then((data) => setProperties(data))
      .catch(() => setProperties([]));
  }, []);

  const savedProperties = properties.filter((p) => favorites.includes(p.id));

  return (
    <div className="container section">
      <h1 className="page-title">Your Favorite Properties</h1>
      <p className="page-subtitle">Properties you have saved.</p>

      {favorites.length === 0 && (
        <p className="note">
          You have not saved any property yet. <Link to="/properties">Browse properties</Link>
        </p>
      )}

      <div className="card-grid">
        {savedProperties.map((property) => (
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
            isFavorite={true}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
