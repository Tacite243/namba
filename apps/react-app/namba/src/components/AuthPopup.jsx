import React, { useState } from "react";

export default function AuthPopup({ closePopup }) {
  const [isSignIn, setIsSignIn] = useState(true);

  const handleSwitchForm = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className="auth-popup-overlay" onClick={closePopup}>
      <div className="auth-popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={closePopup}>
          X
        </button>
        <h2>{isSignIn ? "Se connecter" : "S'inscrire"}</h2>

        {isSignIn ? (
          <form className="auth-form">
            <input type="text" placeholder="Nom d'utilisateur" required />
            <input type="password" placeholder="Mot de passe" required />
            <button type="submit">Se connecter</button>
            <p>
              Pas encore de compte ?{" "}
              <span className="link" onClick={handleSwitchForm}>
                S'inscrire
              </span>
            </p>
          </form>
        ) : (
          <form className="auth-form">
            <input type="text" placeholder="Nom d'utilisateur" required />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Mot de passe" required />
            <button type="submit">S'inscrire</button>
            <p>
              Déjà un compte ?{" "}
              <span className="link" onClick={handleSwitchForm}>
                Se connecter
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
