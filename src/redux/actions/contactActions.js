// Define action types
export const ADD_CONTACT = 'ADD_CONTACT';
export const UPDATE_CONTACT = 'UPDATE_CONTACT';
export const DELETE_CONTACT = 'DELETE_CONTACT';

// Define action creators
export const addContact = (contact) => ({
  type: ADD_CONTACT,
  payload: contact,
});

export const updateContact = (contact) => ({
  type: UPDATE_CONTACT,
  payload: contact,
});

export const deleteContact = (contactId) => ({
  type: DELETE_CONTACT,
  payload: contactId,
});
