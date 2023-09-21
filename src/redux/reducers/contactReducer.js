// Import action types
import {
  ADD_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
} from '../actions/contactActions';

// Define initial state
const initialState = {
  contacts: [],
  _contacts: [],
};

// Define the contact reducer
const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...action.payload],
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        _contacts: state.contacts.filter((contact) =>
          action.payload.onlyEven ? !(contact.id % 2) : true
        ),
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default contactReducer;
