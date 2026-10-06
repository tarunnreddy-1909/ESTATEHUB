import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <h3>EstateHub</h3>
          <p>Your trusted property partner.</p>
        </div>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/properties">Properties</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
      <p className="copyright">© 2026 EstateHub. College mini project.</p>
    </footer>
  );
}

export default Footer;
