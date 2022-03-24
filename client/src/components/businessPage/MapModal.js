import React from 'react';
import {  Modal } from 'react-bootstrap'

import Icon from '../utilities/Icon'
import MapContainer from './MapContainer'

import '../../styles/businessPage/mapContainer.css'

function MapModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            dialogClassName="modalWidth"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter modalTitle" className='text-secondary fontHeader d-flex justify-content-start'>
                    <div className=' mr-2' ><Icon name='place' /></div>
                    {props.textHeader}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='bodyHeight'>
                <MapContainer />
            </Modal.Body>
        </Modal>
    )
}

export default MapModal;






