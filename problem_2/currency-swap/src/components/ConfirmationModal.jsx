// ConfirmationModal.jsx
import React from 'react';
import { Modal, Button } from 'flowbite-react';

function ConfirmationModal({ header, body, isOpen, onClose, onConfirm }) {
  return (
    <Modal show={isOpen} onClose={onClose} size="md">
      <Modal.Header>{header}</Modal.Header>
      <Modal.Body>
        <p>{body}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onConfirm} gradientDuoTone="purpleToPink">
          Confirm
        </Button>
        <Button onClick={onClose} color="gray">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationModal;
