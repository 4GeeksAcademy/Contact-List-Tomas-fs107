import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import ContactCard from "../components/ContactCard";

export default function Contact() {
    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        const dummyContacts = [
            {
                id: 1,
                full_name: "Mike Anamendolla",
                email: "mike.ana@example.com",
                phone: "(870) 288-4149",
                address: "5842 Hillcrest Rd",
                image: "https://randomuser.me/api/portraits/men/1.jpg"
            }
        ];

        dispatch({ type: "get_contacts", payload: dummyContacts });
    }, [dispatch]);

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Lista de Contactos</h2>
                <a href="/add" className="btn btn-success">Add new contact</a>
            </div>

            {store.contacts.length === 0 ? (
                <p>No hay contactos disponibles.</p>
            ) : (
                store.contacts.map((contact) => (
                    <ContactCard key={contact.id} contact={contact} />
                ))
            )}
        </div>
    );
}
