import {
  OPEN_MODAL,
  OPEN_DETAILED_MODAL,
  CLOSE_MODAL,
  CLOSE_DETAILED_MODAL,
} from '../actions/modalActions';

const initialState = {
  openModal: false,
  openDetailedModal: false,
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...state, openModal: true };
    case OPEN_DETAILED_MODAL:
      return { ...state, openDetailedModal: true };
    case CLOSE_MODAL:
      return { ...state, openModal: false };
    case CLOSE_DETAILED_MODAL:
      return { ...state, openDetailedModal: false };
    default:
      return state;
  }
};

export default modalReducer;
