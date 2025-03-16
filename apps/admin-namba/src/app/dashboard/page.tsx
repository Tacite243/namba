"use client";
import React, { useState } from "react";
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";
import "@/styles/globals.css";
import PopupForm from "@/components/popupForm";
import CreateServicePopup from "@/components/createServicePopup";



const Dashboard = () => {

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showServicePopup, setShowServicePopup] = useState(false);
  const orders = [
    { id: 1, client: "John Doe", status: "Non affectée", collector: "Non assigné" },
    { id: 2, client: "Jane Smith", status: "Affectée", collector: "Paul" },
  ]

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleShowServicePopup = () => setShowServicePopup(true);
  const handleCloseServicePopup = () => setShowServicePopup(false);

  return (
    <div className="container">
      <header className="header">
        <h1>Tableau de Bord Administrateur</h1>
      </header>

      {/* Actions principales */}
      <div className="actions">
        <button className="btn secondary" onClick={handleShowServicePopup}>
          Créer un Service
        </button>
        <button className="btn secondary" onClick={handleOpenPopup}>
          Nouveau Collecteur
        </button>
      </div>

      {/* Statistiques */}
      <div className="stats-container">
        <div className="stats-card">
          <span className="stats-icon">📊</span>
          <div>
            <h3>2</h3>
            <p>Commandes totales</p>
          </div>
        </div>
        <div className="stats-card">
          <span className="stats-icon">📊</span>
          <div>
            <h3>2</h3>
            <p>Commandes attribuées</p>
          </div>
        </div>
        <div className="stats-card">
          <span className="stats-icon">📊</span>
          <div>
            <h3>2</h3>
            <p>Commandes non attibuées</p>
          </div>
        </div>
        <div className="stats-card">
          <span className="stats-icon">📊</span>
          <div>
            <h3>2</h3>
            <p>Collecteurs disponibles</p>
          </div>
        </div>
      </div>
      {/* Filtres */}
      <div className="filters">
        <input type="text" placeholder="Rechercher un client..." className="search-input" />
        <select className="select-input">
          <option value="all">Tous les statuts</option>
          <option value="affected">Affectée</option>
          <option value="unaffected">Non affectée</option>
        </select>
      </div>

      {/* Tableau des commandes */}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Client</th>
            <th>Statut</th>
            <th>Collecteur</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.client}</td>
              <td className={order.status === "Affectée" ? "status success" : "status warning"}>
                {order.status}
              </td>
              <td>{order.collector}</td>
              <td className="actions-cell">
                <button className="action-btn edit"><FaEdit /></button>
                <button className="action-btn delete"><FaTrash /></button>
                <button className="action-btn confirm"><FaCheck /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PopupForm */}
      {isPopupOpen && <PopupForm onClose={handleClosePopup} />}
      {showServicePopup && <CreateServicePopup onClose={handleCloseServicePopup} />}
    </div>
  );
};

export default Dashboard;