import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import FilterBar from "../components/FilterBar.jsx";
import PropertyCard from "../components/PropertyCard.jsx";

function Properties({ favorites, onToggleFavorite }) {
  // Values coming from the Home page search (?keyword=...&purpose=...)
  const [searchParams] = useSearchParams();

  // useState: all properties from the API
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // useState: selected filter values
  const [filters, setFilters] = useState({
    keyword: searchParams.get("keyword") || "",
    location: "All",
    type: "All",
    purpose: searchParams.get("purpose") || "All",
    price: "All",
  });

  // useEffect: fetch properties from the Express backend when the page loads
  useEffect(() => {
    fetch("http://localhost:5000/api/properties")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load properties. Is the backend running?");
        setLoading(false);
      });
  }, []);

  // Child (FilterBar) calls this to change one filter value
  function handleFilterChange(name, value) {
    setFilters({ ...filters, [name]: value });
  }

  function resetFilters() {
    setFilters({ keyword: "", location: "All", type: "All", purpose: "All", price: "All" });
  }

  // Student Modification 2: check if a price falls inside the selected range
  function priceMatches(price) {
    if (filters.price === "under50") return price < 5000000;
    if (filters.price === "50to100") return price >= 5000000 && price <= 10000000;
    if (filters.price === "100to200") return price > 10000000 && price <= 20000000;
    if (filters.price === "above200") return price > 20000000;
    return true; // "All"
  }

  // Apply every filter to the list
  const filteredProperties = properties.filter((p) => {
    const text = (p.name + " " + p.location).toLowerCase();
    const matchKeyword = text.includes(filters.keyword.toLowerCase());
    const matchLocation = filters.location === "All" || p.location === filters.location;
    const matchType = filters.type === "All" || p.type === filters.type;
    const matchPurpose = filters.purpose === "All" || p.purpose === filters.purpose; // Student Modification 1
    return matchKeyword && matchLocation && matchType && matchPurpose && priceMatches(p.price);
  });

  return (
    <div className="container section">
      <h1 className="page-title">Properties</h1>
      <p className="page-subtitle">Explore a wide range of properties to buy or rent.</p>

      <FilterBar filters={filters} onFilterChange={handleFilterChange} onReset={resetFilters} />

      {loading && <p className="note">Loading properties...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && filteredProperties.length === 0 && (
        <p className="note">No properties match your filters. Try changing or resetting them.</p>
      )}

      <div className="card-grid">
        {/* Parent -> child: each property is passed to PropertyCard as props */}
        {filteredProperties.map((property) => (
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
    </div>
  );
}

export default Properties;
