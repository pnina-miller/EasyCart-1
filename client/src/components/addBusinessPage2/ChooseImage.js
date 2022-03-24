import React, { useState, useEffect } from 'react';
import { StyledDemo } from '../easyCrop/index';
import { Modal } from 'react-bootstrap';

 function ChooseImage(props) {

    const{ setImageAfterChange, imageSrc, setImageSrc } = props;

    let [closeCropModal, setcloseCropModal] = useState(true);

    useEffect(() => {
        if (!closeCropModal) {
            props.onHide()
            setcloseCropModal(true)
        }
         // eslint-disable-next-line
    }, [closeCropModal])

    return (
        <>
            <Modal className="modal-fullscreen-sm-down" {...props} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <StyledDemo setcloseCropModal={setcloseCropModal} setImageSrc={setImageSrc} imageSrc={imageSrc} setImageAfterChange={setImageAfterChange} />
                </Modal.Body>
            </Modal>

        </>
    );
}
export default  ChooseImage;
