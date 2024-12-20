import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthPopup = ({ closePopup }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [location, setLocation] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const storedLocation = localStorage.getItem("userLocation");
    if (storedLocation) {
      setLocation(JSON.parse(storedLocation));
      navigate("/services");
    }
  }, [navigate]);

  const handleSwitchForm = () => {
    setIsSignIn(!isSignIn);
    setFormData({ username: "", email: "", password: "" });
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      setErrorMessage(
        "La géolocalisation n'est pas prise en charge par votre navigateur."
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setLocation(userLocation);
        localStorage.setItem("userLocation", JSON.stringify(userLocation));
      },
      (error) => {
        setErrorMessage(
          "Impossible de récupérer votre localisation. Veuillez l'activer dans les paramètres de votre navigateur."
        );
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setErrorMessage("Le nom d'utilisateur et le mot de passe sont requis.");
      return;
    }

    if (!location) {
      setErrorMessage(
        "Veuillez activer votre localisation avant de continuer."
      );
      getLocation();
      return;
    }

    const endpoint = isSignIn ? "/api/user/login" : "/api/user/signup";
    const payload = {
      username: formData.username,
      password: formData.password,
      ...(formData.email && { email: formData.email }),
      location, // Ajouter la localisation
    };

    try {
      const response = await axios.post(
        `http://localhost:3002${endpoint}`,
        payload
      );

      if (response.data.data && response.data.data.token) {
        localStorage.setItem("token", response.data.data.token);

        login();
        setSuccessMessage(
          isSignIn ? "Connexion réussie !" : "Inscription réussie !"
        );
        setTimeout(() => {
          closePopup();
          navigate("/services");
        }, 2000);
      } else {
        setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission :", error.message);
      setErrorMessage("Impossible de traiter votre demande. Réessayez.");
    }
  };

  return (
    <div className="auth-popup-overlay" onClick={closePopup}>
      <div className="auth-popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={closePopup}>
          X
        </button>
        <h2>{isSignIn ? "Se connecter" : "S'inscrire"}</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            name="username"
            placeholder="Nom d'utilisateur"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          {!isSignIn && (
            <input
              type="email"
              name="email"
              placeholder="Adresse mail (facultative)"
              value={formData.email}
              onChange={handleInputChange}
            />
          )}
          <button type="submit">
            {isSignIn ? "Se connecter" : "S'inscrire"}
          </button>
          <p>
            {isSignIn ? "Pas encore de compte ?" : "Déjà un compte ?"}
            <span className="link" onClick={handleSwitchForm}>
              {isSignIn ? " S'inscrire" : " Se connecter"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthPopup;
