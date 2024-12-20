import React, { useState } from "react";
import {
    FaEdit,
    FaTrashAlt,
    FaCheck,
    FaTimes,
    FaUserCheck,
    FaUserSlash,
    FaSearch,
    FaFilter,
} from "react-icons/fa";
import { FaChartLine, FaCalendarAlt } from "react-icons/fa";
import '../styles/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';

const AdminDashboard = () => {
    const [orders, setOrders] = useState([
        { id: 1, customer: "John Doe", status: "Non affectée", collector: null },
        { id: 2, customer: "Jane Smith", status: "Affectée", collector: "Paul" },
    ]);

    const [collectors, setCollectors] = useState([
        { id: 1, name: "Paul", isAvailable: true },
        { id: 2, name: "Marie", isAvailable: false },
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [showCollectorModal, setShowCollectorModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [newCollector, setNewCollector] = useState({ name: '', isAvailable: true });

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

    const stats = {
        totalOrders: orders.length,
        pendingOrders: orders.filter(o => o.status === "Non affectée").length,
        activeCollectors: collectors.filter(c => c.isAvailable).length
    };

    // Filtrage des commandes
    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === "all" || order.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    // Nouvelle fonction pour gérer la création/modification de commande
    const handleOrderSubmit = (event) => {
        event.preventDefault();
        if (selectedOrder) {
            setOrders(orders.map(order => 
                order.id === selectedOrder.id ? selectedOrder : order
            ));
        } else {
            setOrders([...orders, {
                id: orders.length + 1,
                customer: selectedOrder.customer,
                status: "Non affectée",
                collector: null
            }]);
        }
        setShowOrderModal(false);
        setSelectedOrder(null);
    };

    // Nouvelle fonction pour créer un collecteur
    const handleCollectorSubmit = (event) => {
        event.preventDefault();
        setCollectors([...collectors, {
            id: collectors.length + 1,
            ...newCollector
        }]);
        setShowCollectorModal(false);
        setNewCollector({ name: '', isAvailable: true });
    };

    return (
        <div className="admin-dashboard p-4">
            <h1 className="dashboard-title mb-4">
                Tableau de Bord Administrateur
            </h1>

            {/* Ajouter ces boutons après le titre */}
            <div className="mb-4">
                <Button variant="primary" className="me-2" onClick={() => setShowOrderModal(true)}>
                    Nouvelle Commande
                </Button>
                <Button variant="success" onClick={() => setShowCollectorModal(true)}>
                    Nouveau Collecteur
                </Button>
            </div>

            {/* Cartes de statistiques améliorées */}
            <div className="row stats-container mb-4">
                <div className="col-md-4">
                    <div className="card stats-card bg-gradient shadow-sm">
                        <div className="card-body d-flex align-items-center p-4">
                            <FaChartLine className="stats-icon text-primary fs-1 me-3" />
                            <div>
                                <h3 className="stats-number mb-0">{stats.totalOrders}</h3>
                                <p className="stats-label text-muted mb-0">Commandes totales</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ... autres cartes de stats ... */}
            </div>

            {/* Section Commandes avec recherche et filtres */}
            <div className="card mb-4">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="card-title mb-0">Commandes</h2>
                        <div className="d-flex gap-3">
                            <div className="search-box">
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <FaSearch />
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Rechercher un client..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                            <select
                                className="form-select"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="all">Tous les statuts</option>
                                <option value="Non affectée">Non affectée</option>
                                <option value="Affectée">Affectée</option>
                            </select>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover">
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
                                {filteredOrders.map((order) => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.customer}</td>
                                        <td>{order.status}</td>
                                        <td>{order.collector || "Non assigné"}</td>
                                        <td>
                                            <div className="action-buttons">
                                                <FaEdit
                                                    className="action-icon edit-icon"
                                                    onClick={() => handleEditOrder(order.id)}
                                                />
                                                <FaTrashAlt
                                                    className="action-icon delete-icon"
                                                    onClick={() => handleDeleteOrder(order.id)}
                                                />
                                                <FaCheck
                                                    className="action-icon assign-icon"
                                                    onClick={() => handleAssignOrder(order.id)}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Section Collecteurs améliorée */}
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title mb-4">Collecteurs</h2>
                    <div className="row">
                        {collectors.map((collector) => (
                            <div key={collector.id} className="col-sm-6 col-lg-4 mb-3">
                                <div className="collector-card shadow-sm rounded p-4 border">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h3 className="collector-name h5 mb-2">{collector.name}</h3>
                                            <span className={`badge ${collector.isAvailable ? 'bg-success' : 'bg-danger'} mb-2`}>
                                                {collector.isAvailable ? "Disponible" : "Indisponible"}
                                            </span>
                                        </div>
                                        <button
                                            className={`btn btn-sm ${collector.isAvailable ? 'btn-outline-danger' : 'btn-outline-success'}`}
                                            onClick={() => toggleAvailability(collector.id)}
                                        >
                                            {collector.isAvailable ? <FaUserSlash /> : <FaUserCheck />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal pour la gestion des commandes */}
            <Modal show={showOrderModal} onHide={() => setShowOrderModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {selectedOrder ? "Modifier la Commande" : "Nouvelle Commande"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleOrderSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Client</Form.Label>
                            <Form.Control
                                type="text"
                                value={selectedOrder?.customer || ''}
                                onChange={(e) => setSelectedOrder({
                                    ...selectedOrder,
                                    customer: e.target.value
                                })}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {selectedOrder ? "Modifier" : "Créer"}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Modal pour la création de collecteur */}
            <Modal show={showCollectorModal} onHide={() => setShowCollectorModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Nouveau Collecteur</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleCollectorSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control
                                type="text"
                                value={newCollector.name}
                                onChange={(e) => setNewCollector({
                                    ...newCollector,
                                    name: e.target.value
                                })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Check
                                type="checkbox"
                                label="Disponible"
                                checked={newCollector.isAvailable}
                                onChange={(e) => setNewCollector({
                                    ...newCollector,
                                    isAvailable: e.target.checked
                                })}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Créer
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AdminDashboard;