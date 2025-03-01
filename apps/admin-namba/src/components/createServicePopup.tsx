import React, { useState } from "react";

interface CreateServicePopupProps {
    onClose: () => void;
}

const CreateServicePopup: React.FC<CreateServicePopupProps> = ({ onClose }) => {
    const [serviceName, setServiceName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Logique pour soumettre le formulaire (création de service)
        onClose(); // Fermer le popup après la soumission
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
                            value={serviceName}
                            onChange={(e) => setServiceName(e.target.value)}
                            placeholder="Nom du service"
                        />
                    </div>
                    <div className="popup-actions">
                        <button type="submit" className="btn primary">Valider</button>
                        <button type="button" className="btn secondary" onClick={onClose}>Annuler</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateServicePopup;