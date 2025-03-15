"use client"
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createService } from "@/redux/slices/serviceSlice";
import { AppDispatch } from "@/redux/store";

interface CreateServicePopupProps {
  onClose: () => void;
}

const CreateServicePopup: React.FC<CreateServicePopupProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [serviceData, setServiceData] = useState({
    name: "",
    description: "",
    price: 0,
    unit: "pièce",
    like: 0,
    image: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Fonction pour gérer l'upload de l'image sur Cloudinary
  const handleImageUpload = async () => {
    if (!imageFile) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "nambacloud");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/ddyyzgopb/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (data.secure_url) {
        setServiceData((prev) => ({ ...prev, image: data.secure_url }));
      } else {
        alert("Échec de l'upload de l'image. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur d'upload d'image", error);
      alert("Erreur lors du téléversement de l'image.");
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour soumettre le formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!serviceData.name || !serviceData.price || !serviceData.image) {
      alert("Veuillez remplir tous les champs et uploader une image.");
      return;
    }
    if (!serviceData.image.startsWith("http")) {
      alert("L'image n'a pas été téléchargée. Veuillez réessayer.");
      return;
    }
    dispatch(createService(serviceData));
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-form">
        <h2>Créer un Nouveau Service</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="serviceName">Nom du Service</label>
            <input
              type="text"
              id="serviceName"
              placeholder="Nom du service"
              value={serviceData.name}
              onChange={(e) => setServiceData({ ...serviceData, name: e.target.value })}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Description"
              value={serviceData.description}
              onChange={(e) => setServiceData({ ...serviceData, description: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label htmlFor="price">Prix</label>
            <input
              type="number"
              id="price"
              placeholder="Prix"
              value={serviceData.price}
              onChange={(e) => setServiceData({ ...serviceData, price: Number(e.target.value) })}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            />
            <button type="button" onClick={handleImageUpload} disabled={loading}>
              {loading ? "Upload en cours..." : "Uploader Image"}
            </button>
            {serviceData.image && (
              <img
                src={serviceData.image}
                alt="Aperçu"
                style={{ width: "200px", borderRadius: "8px", marginTop: "10px" }}
              />
            )}
          </div>
          <div className="popup-actions">
            <button type="submit" className="btn primary" disabled={loading}>
              {loading ? "Création..." : "Valider"}
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