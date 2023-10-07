import React from 'react';
import {Modal, Button} from 'react-bootstrap'
import { useEffect, useState } from 'react';
import '../App.css';


function Alert( {message, showModal}) {
    const [show, setShow] = useState(showModal);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    return (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Message</Modal.Title>
          </Modal.Header>
          <Modal.Body>{message}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose} >Close</Button>
          </Modal.Footer>
        </Modal>
      );

}

export default Alert;