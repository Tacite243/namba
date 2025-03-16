"use client";
import React, { useState } from "react";
import { API_URL } from "@/redux/constantes";

interface PopupFormProps {
  onClose: () => void;
}

const PopupForm: React.FC<PopupFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(API_URL + "/auth/createCollector", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmMTZiZGVjOC1iZTA1LTRhZGItOWY3Mi05ZmFiODQyNjQxM2IiLCJyb2xlIjoiQ0xJRU5UIiwiaWF0IjoxNzQxODY5NDU3LCJleHAiOjE3NDI0NzQyNTd9.cSwr25igtvu6CrVz7vTUaqbYR_-B3rjccHr1lFQnRWM`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création du collecteur");
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose(); // Ferme le popup après succès
      }, 2000);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-form">
        <h2>Créer un nouveau collecteur</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Nom du Collecteur</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="phoneNumber">Téléphone</label>
            <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
          </div>

          {error && <p className="error">{error}</p>}
          {success && <p className="success">Collecteur créé avec succès !</p>}

          <div className="popup-actions">
            <button type="submit" className="btn primary" disabled={loading}>
              {loading ? "Création en cours..." : "Créer"}
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

export default PopupForm;