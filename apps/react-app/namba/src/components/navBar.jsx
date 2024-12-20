import { Link } from "react-router-dom";
import logo from "/bubbles.png";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import AuthPopup from "../client/AuthPopup"; // Importer le composant AuthPopup

export default function NavBar() {
  const { isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // État pour ouvrir le popup

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link to={"/"} className="navbar-brand">
          <img src={logo} className="logo img-fluid" alt="" />
          <span className="ms-2">NAMBA</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
          style={{
            width: isOpen ? "75%" : "0",
            transition: "width 0.3s",
          }}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to={"/"} className="nav-link active">
                Accueil
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/about"} className="nav-link">
                À propos de nous
              </Link>
            </li>

            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                id="navbarLightDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Pages
              </Link>

              <ul
                className="dropdown-menu dropdown-menu-light"
                aria-labelledby="navbarLightDropdownMenuLink"
              >
                <li>
                  <Link to={"/services"} className="dropdown-item">
                    Nos Services
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item">Coming Soon</Link>
                </li>
                <li>
                  <Link className="dropdown-item">Page 404</Link>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <Link to={"/contact"} className="nav-link">
                Nos Contacts
              </Link>
            </li>

            {isAuthenticated ? (
              <li className="nav-item ms-3">
                <button
                  onClick={logout}
                  className="nav-link custom-btn custom-border-btn custom-btn-bg-white btn"
                >
                  Déconnexion
                </button>
              </li>
            ) : (
              <li className="nav-item ms-3">
                <button
                  onClick={openPopup}
                  className="nav-link custom-btn custom-border-btn custom-btn-bg-white btn"
                >
                  Connexion
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>

      {isPopupOpen && <AuthPopup closePopup={closePopup} />}
    </nav>
  );
}
