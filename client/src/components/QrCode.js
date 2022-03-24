import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import QRCode from "react-qr-code";
import { exportComponentAsPNG } from "react-component-export-image";

import Icon from "./utilities/Icon";
// import '../styles/share.css';

function QrCode(props) {
  const { url } = props;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const componentRef = useRef("");

  return (
    <>
      <OverlayTrigger
        key="top"
        placement="top"
        overlay={<Tooltip id="tooltip-top">QR Code</Tooltip>}
      >
        <button onClick={handleShow} className="icon-btn">
            <Icon name="qr"/>
        </button>
      </OverlayTrigger>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{url}</Modal.Title>
        </Modal.Header>
        <Modal.Body ref={componentRef} className="css-center">
          <QRCode value={url} size={300} level={"H"} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-dark"
            onClick={() => exportComponentAsPNG(componentRef)}
          >
            Download QR Code
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default  QrCode