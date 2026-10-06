import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Properties from "./pages/Properties.jsx";
import PropertyDetails from "./pages/PropertyDetails.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Favorites from "./pages/Favorites.jsx";
import SignIn from "./pages/SignIn.jsx";

function App() {
  // useState: ids of favorite properties (shared by all pages)
  const [favorites, setFavorites] = useState([]);

  // useState: the signed-in user (null means nobody is signed in)
  const [user, setUser] = useState(null);

  function toggleFavorite(id) {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  }

  function handleSignIn(userData) {
    setUser(userData);
  }

  function handleSignOut() {
    setUser(null);
  }

  return (
    <div className="app">
      <Navbar favoriteCount={favorites.length} user={user} onSignOut={handleSignOut} />

      <main className="main">
        <Routes>
          <Route path="/" element={<Home favorites={favorites} onToggleFavorite={toggleFavorite} />} />
          <Route path="/properties" element={<Properties favorites={favorites} onToggleFavorite={toggleFavorite} />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/favorites" element={<Favorites favorites={favorites} onToggleFavorite={toggleFavorite} />} />
          <Route path="/signin" element={<SignIn onSignIn={handleSignIn} />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;