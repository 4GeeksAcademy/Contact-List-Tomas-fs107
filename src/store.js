export const initialStore = () => ({
  contacts: []
});

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "get_contacts":
      return { ...store, contacts: action.payload };
    case "add_contact":
      return { ...store, contacts: [...store.contacts, action.payload] };
    case "update_contact":
      return {
        ...store,
        contacts: store.contacts.map(c =>
          c.id === action.payload.id ? action.payload : c
        )
      };
    case "delete_contact":
      return {
        ...store,
        contacts: store.contacts.filter(c => c.id !== action.payload)
      };
    default:
      throw Error("Unknown action.");
  }
}
