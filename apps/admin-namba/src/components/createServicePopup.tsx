import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createService } from "@/redux/slices/serviceSlice";
import { AppDispatch, RootState } from "@/redux/store"

interface CreateServicePopupProps {
  onClose: () => void;
}

const CreateServicePopup: React.FC<CreateServicePopupProps> = ({ onClose }) => {
  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.service);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceName.trim() || !price.trim()) return;

    await dispatch(createService({ name: serviceName, description, price: parseFloat(price) }));
    onClose(); // Ferme le popup après soumission
  };

  return (
    <div className="popup-overlay">
      <div className="popup-form">
        <h2>Créer un Nouveau Service</h2>
        {/* Vérifie si l'erreur est une chaîne et l'affiche */}
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="serviceName">Nom du Service</label>
            <input
              type="text"
              id="serviceName"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              placeholder="Nom du service"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description du service"
            />
          </div>
          <div className="input-group">
            <label htmlFor="price">Prix</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Prix du service"
              required
            />
          </div>
          <div className="popup-actions">
            <button type="submit" className="btn primary" disabled={loading}>
              {loading ? "Envoi..." : "Valider"}
            </button>
            <button type="button" className="btn secondary" onClick={onClose}>
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateServicePopup;
