export const OPEN_MODAL = "OPEN_MODAL";
export const OPEN_DETAILED_MODAL = "OPEN_DETAILED_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const CLOSE_DETAILED_MODAL = "CLOSE_DETAILED_MODAL";

export const openModal = () => ({
  type: OPEN_MODAL,
});

export const openDetailedModal = () => ({
  type: OPEN_DETAILED_MODAL,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});

export const closeDetailedModal = () => ({
  type: CLOSE_DETAILED_MODAL,
});
