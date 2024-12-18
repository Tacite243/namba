import React, { useState } from "react";


const CollectorPage = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    phone: "123-456-7890",
  });

  const handleToggle = () => {
    setIsAvailable(!isAvailable);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    alert("Profil mis à jour avec succès !");
  };

  return (
    <div className="collector-page section-bg section-padding">
      <div className="container">
        <h1 className="page-title">Collecteur d'Habits</h1>

        {/* Disponibilité Toggle */}
        <div className="availability-toggle">
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={isAvailable}
              onChange={handleToggle}
            />
            <span className="toggle-slider"></span>
          </label>
          <p>{isAvailable ? "Disponible" : "Non Disponible"}</p>
        </div>

        {/* Commandes Disponibles */}
        <div className="orders-section">
          <h2>Commandes Disponibles</h2>
          <ul className="orders-list">
            <li>Commande #001 - Client: Alice - 5 vêtements</li>
            <li>Commande #002 - Client: Bob - 3 vêtements</li>
            <li>Commande #003 - Client: Charlie - 2 vêtements</li>
          </ul>
        </div>

        {/* Modifier Profil */}
        <div className="profile-section">
          <h2>Modifier Profil</h2>
          <form onSubmit={handleProfileSubmit} className="profile-form">
            <div className="form-group">
              <label>Nom:</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
              />
            </div>
            <div className="form-group">
              <label>Téléphone:</label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleProfileChange}
              />
            </div>
            <button type="submit" className="custom-btn">
              Enregistrer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CollectorPage;
