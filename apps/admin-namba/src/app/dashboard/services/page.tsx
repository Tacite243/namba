"use client";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { AppDispatch, RootState } from "@/redux/store";
import {
  fetchServices,
  createService,
  updateService,
  deleteService,
} from "@/redux/slices/serviceSlice";

interface Service {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  unit: string;
}

const Services = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { services, loading, error } = useSelector((state: RootState) => state.service);
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const { register, handleSubmit, reset, setValue } = useForm<Service>();

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const toggleDescription = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const onCreate = (data: Service) => {
    dispatch(createService(data));
    setShowModal(false);
    reset();
  };

  const onEdit = (data: Service) => {
    dispatch(updateService(data));
    setShowEditModal(false);
    reset();
  };

  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce service ?")) {
      dispatch(deleteService(id));
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Gestion des Services</h1>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          <FaPlus /> Ajouter un Service
        </button>
      </header>

      {loading && <div className="spinner-container"><div className="spinner"></div></div>}
      {error && <p className="error">Erreur: {error}</p>}

      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nom du Service</th>
            <th>Description</th>
            <th>Prix</th>
            <th>Unité</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service, index) => {
            const isExpanded = expanded[service.id];
            return (
              <tr key={service.id}>
                <td>{index + 1}</td>
                <td>{service.name}</td>
                <td>
                  {isExpanded ? service.description : `${service.description?.slice(0, 50)}...`}
                  {service.description && (
                    <button className="see-more-btn" onClick={() => toggleDescription(service.id)}>
                      {isExpanded ? "Voir moins" : "Voir plus"}
                    </button>
                  )}
                </td>
                <td>{service.price} $</td>
                <td>{service.unit}</td>
                <td className="actions-cell">
                  <button
                    className="action-btn edit"
                    onClick={() => {
                      setEditingService({...service, description: service.description || ""});
                      setValue("id", service.id);
                      setValue("name", service.name);
                      setValue("description", service.description || "");
                      setValue("image", service.image);
                      setValue("price", service.price);
                      setValue("unit", service.unit);
                      setShowEditModal(true);
                    }}
                  >
                    <FaEdit />
                  </button>
                  <button className="action-btn delete" onClick={() => handleDelete(service.id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {showModal && (
        <div className="modal fade-in">
          <div className="modal-content">
            <h2>Ajouter un Service</h2>
            <form onSubmit={handleSubmit(onCreate)}>
              <input type="text" placeholder="Nom du service" {...register("name", { required: true })} />
              <textarea placeholder="Description du service" {...register("description")} />
              <input type="text" placeholder="URL de l'image" {...register("image")} />
              <input type="number" placeholder="Prix en dollars" {...register("price", { valueAsNumber: true })} />
              <input type="text" placeholder="Unité (ex: kg, pièce)" {...register("unit")} />
              <button type="submit">Créer</button>
              <button type="button" onClick={() => setShowModal(false)}>Annuler</button>
            </form>
          </div>
        </div>
      )}

      {showEditModal && editingService && (
        <div className="modal fade-in">
          <div className="modal-content">
            <h2>Modifier le Service</h2>
            <form onSubmit={handleSubmit(onEdit)}>
              <input type="hidden" {...register("id")} />
              <input type="text" {...register("name")} />
              <textarea {...register("description")} />
              <input type="text" {...register("image")} />
              <input type="number" {...register("price", { valueAsNumber: true })} />
              <input type="text" {...register("unit")} />
              <button type="submit">Mettre à jour</button>
              <button type="button" onClick={() => setShowEditModal(false)}>Annuler</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
