import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export default function AddContact() {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const { id } = useParams();
  const editing = Boolean(id);

  const contactToEdit = store.contacts.find(c => c.id === parseInt(id));
  const [formData, setFormData] = useState({
    name: contactToEdit?.name || "",
    email: contactToEdit?.email || "",
    phone: contactToEdit?.phone || "",
    address: contactToEdit?.address || ""
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const method = editing ? "PUT" : "POST";
    const url = editing
      ? `https://playground.4geeks.com/contact/agendas/tomassarciat/contacts/${id}`
      : `https://playground.4geeks.com/contact/agendas/tomassarciat/contacts`;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const error = await res.json();
        console.error("❌ Error al guardar contacto:", error);
        return;
      }

      const data = await res.json();

      dispatch({
        type: editing ? "update_contact" : "add_contact",
        payload: data
      });

      navigate("/");
    } catch (error) {
      console.error("❌ Error de red:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>{editing ? "Editar Contacto" : "Añadir Contacto"}</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input type="text" name="name" value={formData.name} className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" value={formData.email} className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input type="text" name="phone" value={formData.phone} className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input type="text" name="address" value={formData.address} className="form-control" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">
          {editing ? "Guardar cambios" : "Crear contacto"}
        </button>
      </form>
    </div>
  );
}
