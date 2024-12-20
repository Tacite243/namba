import React, { useState } from "react";
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

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSwitchForm = () => {
    setIsSignIn(!isSignIn);
    setFormData({ username: "", email: "", password: "" });
    setErrorMessage("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\S+$).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setErrorMessage("Le nom d'utilisateur et le mot de passe sont requis.");
      return;
    }

    if (!isSignIn && !validatePassword(formData.password)) {
      setErrorMessage(
        "Le mot de passe doit contenir au moins 8 caractères, un chiffre, une majuscule, une minuscule, et ne pas contenir d'espaces."
      );
      return;
    }

    const endpoint = isSignIn ? "/api/signin" : "/api/user";
    const payload = {
      username: formData.username,
      password: formData.password,
      ...(formData.email && { email: formData.email }),
    };

    try {
      const response = await axios.post(
        `http://localhost:3002${endpoint}`,
        payload
      );

      if (response.data.data && response.data.data.token) {
        localStorage.setItem("token", response.data.data.token);

        login();
        alert(isSignIn ? "Connexion réussie !" : "Inscription réussie !");
        closePopup();
        navigate("/services");
      } else {
        console.error("Aucun token trouvé dans la réponse.");
        setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setErrorMessage("Nom d'utilisateur ou mot de passe incorrect.");
        } else if (error.response.status === 400 && !isSignIn) {
          if (error.response.data.error === "User already exists") {
            alert(
              "Cet utilisateur existe déjà. Veuillez essayer de vous connecter."
            );
            handleSwitchForm();
          } else {
            setErrorMessage(error.response.data.error || "Erreur inconnue.");
          }
        }
      } else {
        console.error("Erreur réseau ou serveur :", error.message);
        setErrorMessage("Impossible de traiter votre demande. Réessayez.");
      }
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
