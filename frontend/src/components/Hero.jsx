import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";

function Hero() {
  // useState: values typed in the search bar
  const [location, setLocation] = useState("");
  const [purpose, setPurpose] = useState("All");
  const navigate = useNavigate();

  // onClick handler: go to the Properties page with the search values in the URL
  function handleSearch() {
    navigate("/properties?keyword=" + encodeURIComponent(location) + "&purpose=" + purpose);
  }

  return (
    <section className="hero">
      <div className="container hero-content">
        <h1>Find Your Perfect Home</h1>
        <p>Buy or rent properties easily with EstateHub.</p>

        {/* Parent -> child: Hero passes state and functions to SearchBar */}
        <SearchBar
          location={location}
          purpose={purpose}
          onLocationChange={setLocation}
          onPurposeChange={setPurpose}
          onSearch={handleSearch}
        />
      </div>
    </section>
  );
}

export default Hero;
