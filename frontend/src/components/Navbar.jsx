import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar({ favoriteCount, user, onSignOut }) {
  // useState: controls the menu on mobile screens
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleSignOut() {
    onSignOut();
    closeMenu();
  }

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="logo" onClick={closeMenu}>
          EstateHub
        </Link>

        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
          <NavLink to="/properties" onClick={closeMenu}>Properties</NavLink>
          <NavLink to="/about" onClick={closeMenu}>About</NavLink>
          <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
          <NavLink to="/favorites" className="fav-link" onClick={closeMenu}>
            ♥ {favoriteCount}
          </NavLink>

          {/* Show Sign Out if a user is signed in, otherwise show Sign In */}
          {user ? (
            <>
              <span className="user-name">Hi, {user.name}</span>
              <button className="btn btn-outline btn-small" onClick={handleSignOut}>
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/signin" className="btn btn-green btn-small" onClick={closeMenu}>
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;