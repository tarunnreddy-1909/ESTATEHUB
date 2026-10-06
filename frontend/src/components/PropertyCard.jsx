import { Link } from "react-router-dom";

// Props: the parent sends all the property information to this card
function PropertyCard({ id, name, price, location, bedrooms, bathrooms, area, image, isFavorite, onToggleFavorite }) {
  return (
    <div className="card">
      <div className="card-image">
        <img src={image} alt={name} />
        {/* onClick: tells the parent to add/remove this property from favorites */}
        <button
          className={isFavorite ? "heart active" : "heart"}
          onClick={() => onToggleFavorite(id)}
          title="Add to favorites"
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>

      <div className="card-body">
        <h3>{name}</h3>
        <p className="price">{price}</p>
        <p className="location">📍 {location}</p>
        <div className="card-info">
          <span>🛏 {bedrooms} Beds</span>
          <span>🛁 {bathrooms} Baths</span>
          <span>📐 {area} sq.ft</span>
        </div>
        <Link to={"/property/" + id} className="btn btn-navy">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default PropertyCard;
