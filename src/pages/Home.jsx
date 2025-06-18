import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import ContactCard from "../components/ContactCard";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    const AGENDA = "tomassarciat";
    const BASE = "https://playground.4geeks.com/contact/agendas";

    const fetchContacts = () => {
      fetch(`${BASE}/${AGENDA}/contacts`)
        .then(res => res.json())
        .then(data => {
          dispatch({ type: "get_contacts", payload: data.contacts });
        })
        .catch(err => console.error("❌ Error al obtener contactos:", err));
    };

    // 1. Comprobar si la agenda existe
    fetch(`${BASE}/${AGENDA}`)
      .then(res => {
        if (res.status === 404) {
          // 2. Si no existe, la creamos
          return fetch(`${BASE}/${AGENDA}`, { method: "POST" });
        }
        return Promise.resolve(); // si existe, no hacer nada
      })
      .then(() => fetchContacts())
      .catch(err => console.error("❌ Error al crear la agenda:", err));
  }, [dispatch]);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Lista de Contactos</h2>
        <a href="/add" className="btn btn-success">Add new contact</a>
      </div>

      {!Array.isArray(store.contacts) ? (
        <p>Error cargando contactos.</p>
      ) : store.contacts.length === 0 ? (
        <p>No hay contactos disponibles.</p>
      ) : (
        store.contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))
      )}
    </div>
  );
};
