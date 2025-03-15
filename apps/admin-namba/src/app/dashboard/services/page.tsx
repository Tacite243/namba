"use client";

import { useState } from "react";
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";

const Services = () => {
  const [services, setServices] = useState([
    { id: 1, name: "Pressing Express", category: "Nettoyage", status: "Actif" },
    { id: 2, name: "Repassage Premium", category: "Repassage", status: "Inactif" },
  ]);

  return (
    <div className="container">
      <header className="header">
        <h1>Gestion des Services</h1>
      </header>

      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nom du Service</th>
            <th>Catégorie</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>{service.id}</td>
              <td>{service.name}</td>
              <td>{service.category}</td>
              <td>
                <span className={`status ${service.status === "Actif" ? "success" : "warning"}`}>
                  {service.status}
                </span>
              </td>
              <td className="actions-cell">
                <button className="action-btn edit">
                  <FaEdit />
                </button>
                <button className="action-btn delete">
                  <FaTrash />
                </button>
                <button className="action-btn confirm">
                  <FaCheck />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Services;
