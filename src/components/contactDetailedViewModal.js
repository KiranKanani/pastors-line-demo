import React from 'react';
import Modal from 'react-bootstrap/Modal';

const DetailedContactView = ({ openDetailedModal, closeDetailedModal }) => {
  return (
    <Modal show={openDetailedModal} onHide={closeDetailedModal} size='lg'>
      <Modal.Header>Detailed View</Modal.Header>
      <Modal.Body>This is detailed view of previous modal</Modal.Body>
    </Modal>
  );
};

export default DetailedContactView;
