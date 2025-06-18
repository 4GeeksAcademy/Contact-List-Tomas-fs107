import React from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export default function ContactCard({ contact }) {
    const { dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const defaultImage = "https://imgs.search.brave.com/sHCs2Dbiq00xNSEB7VrCilu1gkBtEBpsn0OjheXuAs0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9mci53/ZWIuaW1nNC5hY3N0/YS5uZXQvY18zMDBf/MzAwL3BpY3R1cmVz/LzE1LzA2LzAyLzE0/LzAzLzI3ODkwNi5q/cGc";

    const handleDelete = async () => {
        try {
            const res = await fetch(
                `https://playground.4geeks.com/contact/agendas/tomassarciat/contacts/${contact.id}`,
                { method: "DELETE" }
            );

            if (!res.ok) throw new Error("Error al eliminar contacto");

            dispatch({ type: "delete_contact", payload: contact.id });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div className="card mb-3" style={{ maxWidth: "540px" }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img
                            src={defaultImage}
                            className="img-fluid rounded-start"
                            alt={contact.name}
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{contact.name}</h5>
                            <p className="card-text">
                                <strong>Email:</strong> {contact.email}<br />
                                <strong>Teléfono:</strong> {contact.phone}<br />
                                <strong>Dirección:</strong> {contact.address}
                            </p>
                            <div className="d-flex gap-2">
                                <button
                                    className="btn btn-outline-primary btn-sm"
                                    onClick={() => navigate(`/edit/${contact.id}`)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-outline-danger btn-sm"
                                    data-bs-toggle="modal"
                                    data-bs-target={`#modal-${contact.id}`}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="modal fade"
                id={`modal-${contact.id}`}
                tabIndex="-1"
                aria-labelledby={`modalLabel-${contact.id}`}
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={`modalLabel-${contact.id}`}>Confirmar eliminación</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            ¿Estás seguro de que deseas eliminar a <strong>{contact.name}</strong>?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                                onClick={handleDelete}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
