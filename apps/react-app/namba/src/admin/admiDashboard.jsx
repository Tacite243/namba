import React, { useState } from "react";
import {
    FaEdit,
    FaTrashAlt,
    FaCheck,
    FaTimes,
    FaUserCheck,
    FaUserSlash,
} from "react-icons/fa";

const AdminDashboard = () => {
    const [orders, setOrders] = useState([
        { id: 1, customer: "John Doe", status: "Non affectée", collector: null },
        { id: 2, customer: "Jane Smith", status: "Affectée", collector: "Paul" },
    ]);

    const [collectors, setCollectors] = useState([
        { id: 1, name: "Paul", isAvailable: true },
        { id: 2, name: "Marie", isAvailable: false },
    ]);

    const toggleAvailability = (id) => {
        setCollectors((prev) =>
            prev.map((collector) =>
                collector.id === id
                    ? { ...collector, isAvailable: !collector.isAvailable }
                    : collector
            )
        );
    };

    const handleEditOrder = (id) => alert(`Modifier commande ${id}`);
    const handleDeleteOrder = (id) => alert(`Supprimer commande ${id}`);
    const handleAssignOrder = (id) => alert(`Assigner collecteur à la commande ${id}`);

    return (
        <div className="admin-dashboard">
            <h1 className="dashboard-title">Tableau de Bord Administrateur</h1>

            {/* Section Commandes */}
            <section className="orders-section">
                <h2 className="section-title">Commandes</h2>
                <div className="orders-table">
                    <table>
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
                                    <td>{order.customer}</td>
                                    <td>{order.status}</td>
                                    <td>{order.collector || "Non assigné"}</td>
                                    <td className="actions">
                                        <FaEdit
                                            className="action-icon edit-icon"
                                            title="Modifier"
                                            onClick={() => handleEditOrder(order.id)}
                                        />
                                        <FaTrashAlt
                                            className="action-icon delete-icon"
                                            title="Supprimer"
                                            onClick={() => handleDeleteOrder(order.id)}
                                        />
                                        <FaCheck
                                            className="action-icon assign-icon"
                                            title="Assigner"
                                            onClick={() => handleAssignOrder(order.id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Section Collecteurs */}
            <section className="collectors-section">
                <h2 className="section-title">Collecteurs</h2>
                <ul className="collectors-list">
                    {collectors.map((collector) => (
                        <li key={collector.id} className="collector-item">
                            <span className="collector-name">{collector.name}</span>
                            <span
                                className={`status ${collector.isAvailable ? "available" : "unavailable"
                                    }`}
                            >
                                {collector.isAvailable ? "Disponible" : "Indisponible"}
                            </span>
                            <button
                                className="toggle-btn"
                                title={`Rendre ${collector.isAvailable ? "indisponible" : "disponible"}`}
                                onClick={() => toggleAvailability(collector.id)}
                            >
                                {collector.isAvailable ? <FaUserSlash /> : <FaUserCheck />}
                            </button>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default AdminDashboard;