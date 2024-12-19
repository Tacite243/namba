import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

const CollectorPage = () => {
    const [isAvailable, setIsAvailable] = useState(false);
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [isCartVisible, setIsCartVisible] = useState(false);

    const availableOrders = [
        { id: "001", client: "Alice", items: 5, articleName: "vetements" },
        { id: "002", client: "Bob", items: 3, articleName: "costumes" },
        { id: "003", client: "Charlie", items: 2, articleName: "tapis" },
    ];

    const handleToggle = () => {
        setIsAvailable(!isAvailable);
    };

    const handleOrderSelection = (order) => {
        if (isAvailable && !selectedOrders.some((o) => o.id === order.id)) {
            setSelectedOrders([...selectedOrders, order]);
        } else if (!isAvailable) {
            alert("Vous devez être disponible pour ajouter une commande !");
        }
    };

    const handleRemoveFromCart = (orderId) => {
        if (isAvailable) {
            setSelectedOrders(selectedOrders.filter((order) => order.id !== orderId));
        } else {
            alert("Vous devez être disponible pour modifier le panier !");
        }
    };

    return (
        <div className="collector-page section-bg section-padding">
            <div className="container">
                <h1 className="page-title">Collecteur</h1>

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
                    <FaShoppingCart
                        onClick={() => setIsCartVisible(!isCartVisible)}
                        className={`cart-icon ${isCartVisible ? "active" : ""}`}
                        title="Afficher le panier"
                    />
                </div>

                {isCartVisible && (
                    <div className="cart-section">
                        <h2>Panier</h2>
                        {selectedOrders.length > 0 ? (
                            <ul className="orders-list">
                                {selectedOrders.map((order) => (
                                    <li key={order.id}>
                                        Commande #{order.id} - Client: {order.client} -{" "}
                                        {order.items} {order.articleName}
                                        <button
                                            onClick={() => handleRemoveFromCart(order.id)}
                                            className="remove-btn"
                                        >
                                            Retirer
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Aucune commande sélectionnée.</p>
                        )}
                    </div>
                )}

                <div className="orders-section">
                    <h2>Commandes Disponibles</h2>
                    <ul className="orders-list">
                        {availableOrders.map((order) => (
                            <li key={order.id}>
                                Commande #{order.id} - Client: {order.client} - {order.items}{" "}
                                {order.articleName}
                                <button
                                    onClick={() => handleOrderSelection(order)}
                                    className="add-btn"
                                >
                                    S'attribuer
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CollectorPage;