import React, { useState } from "react";

interface PopupFormProps {
  onClose: () => void;
}

const PopupForm: React.FC<PopupFormProps> = ({ onClose }) => {
  const [collectorName, setCollectorName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique de soumission du formulaire, par exemple ajouter un collecteur
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-form">
        <h2>Créer un nouveau collecteur</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="collectorName">Nom du Collecteur</label>
            <input
              type="text"
              id="collectorName"
              value={collectorName}
              onChange={(e) => setCollectorName(e.target.value)}
              placeholder="Nom du collecteur"
            />
          </div>
          <div className="popup-actions">
            <button type="submit" className="btn primary">Valider</button>
            <button
              type="button"
              className="btn secondary"
              onClick={onClose} // Appeler onClose lors de l'annulation
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
